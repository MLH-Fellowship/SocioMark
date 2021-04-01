from bson.objectid import ObjectId
from fastapi import HTTPException
from ..database import posts_collection, users_collection
from .user import add_post_id, delete_post_id

# helpers


def post_helper(post, user) -> dict:
    likes = [str(x) for x in post["likes"]]
    return {
        "post_id": str(post["_id"]),
        "user_id": str(user["_id"]),
        "author_name": user["name"],
        "author_email": user["email"],
        "report_counter": post["report_counter"],
        "likes": likes,
        "image": post["image"],
        "description": post["description"]
    }


async def initialize_post(user_id: ObjectId, post: dict):
    post["user_id"] = user_id
    return post


# Add a new post into to the database
async def add_post(email: str, post_data: dict) -> dict:
    user = await users_collection.find_one({"email": email})
    post_data = await initialize_post(user["_id"], post_data)
    post = await posts_collection.insert_one(post_data)
    new_post = await posts_collection.find_one({"_id": post.inserted_id})
    if await add_post_id(user["_id"], new_post["_id"]):
        return post_helper(new_post, user)
    else:
        raise HTTPException(status_code=501, detail='Something went wrong, try again.')


# Retrieve all posts with user id present in the database
async def retrieve_posts(user_id: ObjectId):
    posts = []
    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    posts_by_user = posts_collection.find({"user_id": ObjectId(user_id)})
    async for post in posts_by_user:
        posts.append(post_helper(post, user))
    return posts


# Retrieve a post with a matching ID
async def retrieve_post(post_id: str) -> dict:
    post = await posts_collection.find_one({"_id": ObjectId(post_id)})
    if post:
        user = await users_collection.find_one({"_id": post["user_id"]})
        return post_helper(post, user)


# Update a post with a matching ID
async def update_post(email: str, post_id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    user = await users_collection.find_one({"email": email})
    post = await posts_collection.find_one({"_id": ObjectId(post_id)})
    if post and user["_id"] == post["user_id"]:
        updated_post = await posts_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
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
        if await delete_post_id(user["_id"], post["_id"]):
            await posts_collection.delete_one({"_id": ObjectId(id)})
        else:
            raise HTTPException(status_code=501, detail='Something went wrong, try again.')
    else:
        raise HTTPException(status_code=501, detail='Something went wrong, try again.')


# Add a like to post model
async def add_like_id(post_id: ObjectId, like_id: ObjectId):
    already_exists = await posts_collection.find_one(
        {"_id": post_id, "likes": like_id}
    )
    if already_exists:
        return True
    else:
        post = await posts_collection.update_one(
            {"_id": post_id}, {"$push": {"likes": like_id}}
        )
        if post:
            return True
        return False


# Delete a like from post model
async def delete_like_id(post_id: ObjectId, like_id: ObjectId):
    already_exists = await posts_collection.find_one(
        {"_id": post_id, "likes": like_id}
    )
    if already_exists:
        post = await posts_collection.update_one(
            {"_id": post_id}, {"$pull": {"likes": like_id}}
        )
        if post:
            return True
        return False
    else:
        return False
