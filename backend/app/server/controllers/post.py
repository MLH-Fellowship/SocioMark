from bson.objectid import ObjectId
from ..database import posts_collection

# helpers


def post_helper(post) -> dict:
    return {
        "post_id": str(post["_id"]),
        "user_id": post["user_id"],
        "report_counter": post["report_counter"],
        "image": post["image"],
        "description": post["description"]
    }


# Add a new post into to the database
async def add_post(post_data: dict) -> dict:
    post = await posts_collection.insert_one(post_data)
    new_post = await posts_collection.find_one({"_id": post.inserted_id})
    return post_helper(new_post)


# Retrieve all posts with user id present in the database
async def retrieve_posts(id: str):
    posts = []
    async for post in posts_collection.find({"user_id": id}):
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
