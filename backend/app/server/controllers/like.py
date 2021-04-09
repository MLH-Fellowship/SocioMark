from bson.objectid import ObjectId
from ..database import likes_collection, users_collection

# helpers


# lightweight mode defined here due to circular dependencies
# besides, only likes API should return lightweight user details
def user_helper_lightweight(user, like_id: ObjectId = None) -> dict:
    if not like_id:
        return {
            "user_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "profile_picture": user["profile_picture"]
        }
    return {
        "like_id": str(like_id),
        "user_id": str(user["_id"]),
        "name": user["name"],
        "profile_picture": user["profile_picture"]
    }


async def retrieve_user_lightweight(like_id: ObjectId, user_id: ObjectId):
    user = await users_collection.find_one({"_id": user_id})
    if user:
        return user_helper_lightweight(user, like_id)


def like_helper(like) -> dict:
    return {
        "like_id": str(like["_id"]),
        "to_delete": like["is_liked"]
    }


async def get_all_likes_on_post(post_id: ObjectId):
    likes = []
    async for like in likes_collection.find({"post_id": post_id}, {"user_id", "is_liked"}):
        if like["is_liked"] is True:
            likes.append(await retrieve_user_lightweight(like["_id"], like["user_id"]))
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
        return user_helper_lightweight(user, new_like.inserted_id)
    else:
        # Next Time: update the is_liked label
        await likes_collection.update_one(
            {"post_id": ObjectId(like_details["post_id"]), "user_id": entry_exists["user_id"]}, {"$set": {"is_liked": not entry_exists["is_liked"]}}
        )
        if not entry_exists["is_liked"]:
            return user_helper_lightweight(user, entry_exists["_id"])
        return like_helper(entry_exists)
