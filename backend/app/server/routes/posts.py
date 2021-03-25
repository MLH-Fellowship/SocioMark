from fastapi import APIRouter
from ..controllers.post import retrieve_posts
from ..models.post import ResponseModel

router = APIRouter()


@router.get("/", response_description="Get all posts by user from the database")
async def get_all_posts(user_id: str):
    all_posts = await retrieve_posts(user_id)
    return ResponseModel(all_posts, "Got all post details successfully.")
