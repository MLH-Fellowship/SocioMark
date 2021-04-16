import cv2
import numpy as np
import tempfile
from PIL import Image
from bson.objectid import ObjectId
from fastapi import HTTPException
from ..database import posts_collection, users_collection
from .like import get_all_likes_on_post
from .comment import get_all_comments_on_post
from .steganography.hash import hash_sha_info
from .upload import upload_image_path, upload_image
from .verify import encode_image, decode_image
from ..config import config

# helpers


def post_helper(post, user, likes=None, comments=None) -> dict:
    if not likes:
        likes = []
    if not comments:
        comments = []
    return {
        "post_id": str(post["_id"]),
        "user_id": str(user["_id"]),
        "author_name": user["name"],
        "author_image": user["profile_picture"],
        "report_counter": post["report_counter"],
        "likes": likes,
        "comments": comments,
        "image": post["image"],
        "description": post["description"]
    }


async def initialize_post(user_id: ObjectId, post: dict, image_url: str, user_sha: str):
    post["image"] = image_url
    post["user_sha"] = user_sha
    post["user_id"] = user_id
    return post


# Add a new post into to the database
async def add_post(email: str, post_data: dict) -> dict:
    user = await users_collection.find_one({"email": email})
    upload_file = post_data["image"]

    image_url = upload_image(upload_file)

    pil_image = Image.open(upload_file.file)
    rgb_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

    embedded_sha = await decode_image(rgb_image)

    sha_already_exists = await posts_collection.find_one({"user_sha": embedded_sha})

    if not sha_already_exists:
        user_sha, info = hash_sha_info(str(user["_id"]))
        encoded_image = await encode_image(rgb_image, info)

        # upload the image
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
            cv2.imwrite(tmp.name, encoded_image)
            image_url = upload_image_path(tmp.name)

    else:
        user_sha = sha_already_exists["user_sha"]

    # delete file
    del post_data["image"]

    post_data = await initialize_post(user["_id"], post_data, image_url, user_sha)
    post = await posts_collection.insert_one(post_data)
    new_post = await posts_collection.find_one({"_id": post.inserted_id})
    return post_helper(new_post, user)


# Retrieve all posts with user id present in the database
async def retrieve_posts(user_id: ObjectId):
    posts = []
    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    posts_by_user = posts_collection.find({"user_id": ObjectId(user_id)})
    async for post in posts_by_user:
        if (post["report_counter"] <= int(config["THRESHOLD"])):
            likes_on_post = await get_all_likes_on_post(post["_id"])
            comments_on_post = await get_all_comments_on_post(post["_id"])
            posts.append(post_helper(post, user, likes_on_post, comments_on_post))
    return posts


# Retrieve all posts from the database
async def retrieve_all_posts():
    posts = []
    async for post in posts_collection.find():
        if (post["report_counter"] <= int(config["THRESHOLD"])):
            user = await users_collection.find_one({"_id": post["user_id"]})
            likes_on_post = await get_all_likes_on_post(post["_id"])
            comments_on_post = await get_all_comments_on_post(post["_id"])
            posts.append(post_helper(post, user, likes_on_post, comments_on_post))
    return posts


# Retrieve a post with a matching ID
async def retrieve_post(post_id: str) -> dict:
    post = await posts_collection.find_one({"_id": ObjectId(post_id)})
    if post and (post["report_counter"] <= int(config["THRESHOLD"])):
        user = await users_collection.find_one({"_id": post["user_id"]})
        likes_on_post = await get_all_likes_on_post(post["_id"])
        comments_on_post = await get_all_comments_on_post(post["_id"])
        return post_helper(post, user, likes_on_post, comments_on_post)


# Update a post with a matching ID
async def update_post(email: str, post_id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    user = await users_collection.find_one({"email": email})
    post = await posts_collection.find_one({"_id": ObjectId(post_id)})
    if post and user["_id"] == post["user_id"]:
        updated_post = await posts_collection.update_one(
            {"_id": ObjectId(post_id)}, {"$set": data}
        )
        if updated_post:
            return True
        return False
    else:
        raise HTTPException(status_code=501, detail='Something went wrong, try again.')


# Report a post with a matching ID
async def report_post(id: str):
    post = await posts_collection.find_one({"_id": ObjectId(id)})
    if post:
        current_counter = post["report_counter"]
        updated_post = await posts_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": {"report_counter": current_counter + 1}}
        )
        if updated_post:
            return True
        return False


# Delete a post from the database
async def delete_post(email: str, id: str):
    user = await users_collection.find_one({"email": email})
    post = await posts_collection.find_one({"_id": ObjectId(id)})
    if post and user["_id"] == post["user_id"]:
        await posts_collection.delete_one({"_id": ObjectId(id)})
        return True
    else:
        raise HTTPException(status_code=403, detail='User not authorized.')
