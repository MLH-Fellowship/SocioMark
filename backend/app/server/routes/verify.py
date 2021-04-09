from fastapi import APIRouter, Body, Depends
from ..models.post import ResponseModel
from ..controllers.auth import auth_handler
from ..controllers.verify import verify_post

router = APIRouter()


@router.post("/", response_description="Verify the post's authenticity")
async def verify_post_data(post_id: str = Body(..., embed=True), current_user=Depends(auth_handler.auth_wrapper)):
    verified_post = await verify_post(post_id)
    if verified_post["is_authentic"]:
        return ResponseModel(verified_post, "Verification successful!")
    else:
        return ResponseModel(verified_post, "Verification failed!")
