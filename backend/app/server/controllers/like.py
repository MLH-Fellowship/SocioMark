from bson.objectid import ObjectId
from ..database import likes_collection, users_collection
from .user import retrieve_user

# helpers


def like_helper(like) -> dict:
    return {
        "post_id": str(like["post_id"]),
        "user_id": str(like["user_id"]),
        "is_liked": like["is_liked"]
    }


async def get_all_likes_on_post(post_id: ObjectId):
    likes = []
    async for like in likes_collection.find({"post_id": post_id}, {"user_id", "is_liked"}):
        if like["is_liked"] is True:
            likes.append(await retrieve_user(like["user_id"], lightweight=True))
    return likes


async def initialize_like(user_id: ObjectId, post_id: ObjectId, like_details: dict) -> dict:
    like_details["user_id"] = user_id
    like_details["post_id"] = post_id
    like_details["is_liked"] = True
    return like_details


# Add a post id to the like model
async def like_unlike_post(email: str, like_details: dict):
    user = await users_collection.find_one({"email": email})
    entry_exists = await likes_collection.find_one({"post_id": ObjectId(like_details["post_id"]), "user_id": user["_id"]})
    if not entry_exists:
        # First Time: create entry
        like_details = await initialize_like(user["_id"], ObjectId(like_details["post_id"]), like_details)
        new_like = await likes_collection.insert_one(like_details)
        return_like = await likes_collection.find_one({"_id": new_like.inserted_id})
    else:
        # Next Time: update the is_liked label
        await likes_collection.update_one(
            {"user_id": entry_exists["user_id"]}, {"$set": {"is_liked": not entry_exists["is_liked"]}}
        )
        return_like = await likes_collection.find_one({"post_id": ObjectId(like_details["post_id"]), "user_id": user["_id"]})
    return like_helper(return_like)