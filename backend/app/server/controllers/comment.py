from bson.objectid import ObjectId
from fastapi import HTTPException
from ..database import comments_collection, users_collection

# helpers


# lightweight modes defined here due to circular dependencies
# Only Likes and Comments APIs should return lightweight user details
def user_helper_lightweight(user, comment) -> dict:
    if "post_id" in comment.keys():
        return {
            "comment_id": str(comment["_id"]),
            "post_id": str(comment["post_id"]),
            "user_id": str(user["_id"]),
            "name": user["name"],
            "profile_picture": user["profile_picture"],
            "payload": comment["payload"],
            "is_commented": comment["is_commented"]
        }
    return {
        "comment_id": str(comment["_id"]),
        "user_id": str(user["_id"]),
        "name": user["name"],
        "profile_picture": user["profile_picture"],
        "payload": comment["payload"]
    }


async def retrieve_user_lightweight(user_id: ObjectId, comment_id: ObjectId, comment_payload: str):
    user = await users_collection.find_one({"_id": user_id})
    if user:
        return user_helper_lightweight(user, {"_id": comment_id, "payload": comment_payload})


async def get_all_comments_on_post(post_id: ObjectId):
    comments = []
    async for comment in comments_collection.find({"post_id": post_id}, {"user_id", "payload", "is_commented"}):
        if comment["is_commented"] is True:
            comments.append(await retrieve_user_lightweight(comment["user_id"], comment["_id"], comment["payload"]))
    return comments


async def initialize_comment(user_id: ObjectId, post_id: ObjectId, comment_details: dict) -> dict:
    comment_details["user_id"] = user_id
    comment_details["post_id"] = post_id
    comment_details["is_commented"] = True
    return comment_details


# Add a post id to the comment model
async def add_comment(email: str, comment_details: dict):
    user = await users_collection.find_one({"email": email})
    # create entry
    comment_details = await initialize_comment(user["_id"], ObjectId(comment_details["post_id"]), comment_details)
    new_comment = await comments_collection.insert_one(comment_details)
    return_comment = await comments_collection.find_one({"_id": new_comment.inserted_id})
    return user_helper_lightweight(user, return_comment)


# Delete the post from comment model
async def delete_comment(email: str, comment_id: str):
    user = await users_collection.find_one({"email": email})
    comment = await comments_collection.find_one({"_id": ObjectId(comment_id)})

    if comment and user["_id"] != comment["user_id"]:
        raise HTTPException(status_code=403, detail='User not authorized.')

    if comment["is_commented"] is True:
        updated_post = await comments_collection.update_one(
            {"_id": ObjectId(comment_id)}, {"$set": {"is_commented": False}}
        )
        if updated_post:
            return True
        else:
            return False
    else:
        raise HTTPException(status_code=404, detail='Comment does not exist.')
