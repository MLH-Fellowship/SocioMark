from fastapi import APIRouter, Body, status, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer
from fastapi import UploadFile, File, Form
from pydantic import EmailStr
from ..config import config

from ..controllers.user import (
    add_user,
    login,
    delete_user,
    retrieve_user,
    update_user,
    get_current_user
)
from ..controllers.post import retrieve_posts

from ..controllers.upload import upload_image
from ..controllers.auth import auth_handler
from ..models.user import (
    ResponseModel,
    LoginSchema,
    UpdateUserModel,
)
router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


@router.post("/register", response_description="User data added into the database", status_code=status.HTTP_201_CREATED)
async def add_user_data(name: str = Form(...), email: EmailStr = Form(...), password: str = Form(...), confirm_password: str = Form(...), description: str = Form(None), image: UploadFile = File(None)):
    image_url = upload_image(image) if image else config["DEFAULT_AVATAR"]
    user = {
        "name": name,
        "email": email,
        "password": password,
        "confirm_password": confirm_password,
        "description": description,
        "profile_picture": image_url
    }
    new_user = await add_user(user)
    return ResponseModel(new_user, "User added successfully.")


@router.post("/login", response_description="User Logged in Successfully", status_code=status.HTTP_201_CREATED)
async def user_login(user_details: LoginSchema = Body(...)):
    user_details = jsonable_encoder(user_details)
    login_response = await login(user_details)
    return ResponseModel(login_response, "User Logged in Successfully")


@router.delete("/delete", response_description="Delete user from the database")
async def delete_user_data(current_user=Depends(auth_handler.auth_wrapper)):
    new_user = await delete_user(current_user)
    return ResponseModel(new_user, "User deleted successfully.")


@router.patch("/update", response_description="Update user from the database")
async def update_user_data(updated_user: UpdateUserModel = Body(...), current_user=Depends(auth_handler.auth_wrapper)):
    updated_user = jsonable_encoder(updated_user)
    new_user = await update_user(current_user, updated_user)
    return ResponseModel(new_user, "User updated successfully.")


@router.get("/details", response_description="Get user details from the database")
async def details_user_data(user_id: str):
    new_user = await retrieve_user(user_id)
    return ResponseModel(new_user, "Got user details successfully.")


@router.get("/current_user", response_description="Get current_user details from the database")
async def current_user_data(current_user=Depends(auth_handler.auth_wrapper)):
    current_user = await get_current_user(current_user)
    return ResponseModel(current_user, "Current user details fetched successfully.")


@router.get("/posts", response_description="Get all posts by user from the database")
async def get_all_posts(user_id: str):
    all_posts = await retrieve_posts(user_id)
    return ResponseModel(all_posts, "Got all post details successfully.")
