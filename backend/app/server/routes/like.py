from fastapi import APIRouter, Body, Depends
from fastapi.encoders import jsonable_encoder
from ..controllers.auth import auth_handler

from ..controllers.like import (
    like_unlike_post
)
from ..models.like import (
    ResponseModel,
    LikeSchema,
)

router = APIRouter()


@router.post("/like_unlike", response_description="Like/Unlike the post")
async def like_unlike_post_data(like_details: LikeSchema = Body(...), current_user=Depends(auth_handler.auth_wrapper)):
    like_details = jsonable_encoder(like_details)
    new_like = await like_unlike_post(current_user, like_details)
    return ResponseModel(new_like, "Post liked/unliked successfully.")
