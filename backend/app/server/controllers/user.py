from bson.objectid import ObjectId
from ..database import users_collection
from fastapi import HTTPException, status
from .auth import auth_handler
from .post import retrieve_posts
from .like import user_helper_lightweight

# helpers


def user_helper(user, posts=None) -> dict:
    if not posts:
        posts = []

    return {
        "user_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "profile_picture": user["profile_picture"],
        "description": user["description"],
        "posts": posts
    }


# Retrieve all users present in the database
async def retrieve_users(lightweight: bool = False):
    users = []
    async for user in users_collection.find():
        if lightweight:
            users.append(user_helper_lightweight(user))
        else:
            posts_by_user = await retrieve_posts(user["_id"])
            users.append(user_helper(user, posts=posts_by_user))
    return users


# Add a new user into to the database
async def add_user(user_data: dict) -> dict:
    if await users_collection.find_one({"email": user_data['email']}):
        raise HTTPException(status_code=409, detail='Account already exists with the email')
    if user_data["password"] != user_data["confirm_password"]:
        raise HTTPException(status_code=422, detail='Password and Confirm Password do not match')
    hashed_password = auth_handler.get_password_hash(user_data["password"])
    user_data["password"] = hashed_password
    del user_data["confirm_password"]
    user = await users_collection.insert_one(user_data)
    new_user = await users_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)


# Login Functionality
async def login(user_data: dict) -> dict:
    getUser = await users_collection.find_one({"email": user_data["email"]})
    if (getUser is None) or (not auth_handler.verify_password(user_data["password"], getUser["password"])):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid Credentials')
    token = auth_handler.create_access_token(str(getUser["email"]))
    return {"access_token": token, "token_type": "bearer"}


# Retrieve a user with a matching ID
async def retrieve_user(id: str) -> dict:
    user = await users_collection.find_one({"_id": ObjectId(id)})
    if user:
        posts_by_user = await retrieve_posts(user["_id"])
        return user_helper(user, posts=posts_by_user)


# Retrieve details of current_user
async def get_current_user(email: str) -> dict:
    user = await users_collection.find_one({"email": email})
    if user:
        posts_by_user = await retrieve_posts(user["_id"])
        return user_helper(user, posts=posts_by_user)


# Update a user with a matching ID
async def update_user(email: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    user = await users_collection.find_one({"email": email})
    if user:
        updated_user = await users_collection.update_one(
            {"email": email}, {"$set": data}
        )
        if updated_user:
            return True
        return False


# Delete a user from the database
async def delete_user(email: str):
    user = await users_collection.find_one({"email": email})
    if user:
        await users_collection.delete_one({"email": email})
        return True
