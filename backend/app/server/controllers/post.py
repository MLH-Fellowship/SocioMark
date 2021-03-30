from bson.objectid import ObjectId
from fastapi import HTTPException
from ..database import posts_collection, users_collection
from .user import add_post_id

# helpers


def post_helper(post, user=None) -> dict:
    if not user:
        user = users_collection.find_one({"_id": post["user_id"]})
    return {
        "post_id": str(post["_id"]),
        "author_name": user["name"],
        "author_email": user["email"],
        "report_counter": post["report_counter"],
        "image": post["image"],
        "description": post["description"]
    }


async def initialize_post(user_id: ObjectId, post: dict):
    post["user_id"] = user_id
    post["report_counter"] = 0
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
async def retrieve_posts(email: str):
    posts = []
    async for post in posts_collection.find({"email": email}):
        posts.append(post_helper(post))
    return posts


# Retrieve a post with a matching ID
async def retrieve_post(id: str) -> dict:
    post = await posts_collection.find_one({"_id": ObjectId(id)})
    if post:
        return post_helper(post)


# Update a post with a matching ID
async def update_post(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    post = await posts_collection.find_one({"_id": ObjectId(id)})
    if post:
        updated_post = await posts_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_post:
            return True
        return False


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
async def delete_post(id: str):
    post = await posts_collection.find_one({"_id": ObjectId(id)})
    if post:
        await posts_collection.delete_one({"_id": ObjectId(id)})
        return True
