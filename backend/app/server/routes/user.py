from fastapi import APIRouter, Body, status
from fastapi.encoders import jsonable_encoder

from ..controllers.user import (
    add_user,
    login,
    delete_user,
    retrieve_user,
    update_user,
    
)
from ..models.user import (
    ResponseModel,
    UserSchema,
    LoginSchema,
    UpdateUserModel,
)

router = APIRouter()


@router.post("/register", response_description="User data added into the database", status_code=status.HTTP_201_CREATED)
async def add_user_data(user: UserSchema = Body(...)):
    user = jsonable_encoder(user)
    new_user = await add_user(user)
    return ResponseModel(new_user, "User added successfully.")

@router.post("/login", response_description="User Logged in Successfully", status_code=status.HTTP_201_CREATED)
async def user_login(user_details: LoginSchema = Body(...)):
    user_details = jsonable_encoder(user_details)
    login_response = await login(user_details)
    return ResponseModel(login_response,"User Logged in Successfully")

@router.delete("/delete", response_description="Delete user from the database")
async def delete_user_data(user_id: str):
    new_user = await delete_user(user_id)
    return ResponseModel(new_user, "User deleted successfully.")


@router.patch("/update", response_description="Update user from the database")
async def update_user_data(user_id: str, updated_user: UpdateUserModel = Body(...)):
    updated_user = jsonable_encoder(updated_user)
    new_user = await update_user(user_id, updated_user)
    return ResponseModel(new_user, "User updated successfully.")


@router.get("/details", response_description="Get user details from the database")
async def details_user_data(user_id: str):
    new_user = await retrieve_user(user_id)
    return ResponseModel(new_user, "Got user details successfully.")
