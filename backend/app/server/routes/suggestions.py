from fastapi import APIRouter
from ..controllers.user import retrieve_users
from ..models.user import ResponseModel

router = APIRouter()


@router.get("/", response_description="Get all lightweight user details from the database")
async def get_all_users_lightweight():
    all_users = await retrieve_users(lightweight=True)
    return ResponseModel(all_users, "Got lightweight user details successfully.")


@router.get("/full", response_description="Get all user details from the database")
async def get_all_users_full():
    all_users = await retrieve_users(lightweight=False)
    return ResponseModel(all_users, "Got full user details successfully.")
