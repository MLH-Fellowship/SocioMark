from fastapi import APIRouter
from ..controllers.user import retrieve_users
from ..models.user import ResponseModel

router = APIRouter()


@router.get("/", response_description="Get all user details from the database")
async def get_all_users():
    all_users = await retrieve_users()
    return ResponseModel(all_users, "Got user details successfully.")
