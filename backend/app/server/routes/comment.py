from fastapi import APIRouter, Body, Depends
from fastapi.encoders import jsonable_encoder
from ..controllers.auth import auth_handler

from ..controllers.comment import (
    add_comment,
    delete_comment
)
from ..models.comment import (
    ResponseModel,
    CommentSchema,
)

router = APIRouter()


@router.post("/comment", response_description="Add a comment to a post")
async def add_comment_post_data(comment_details: CommentSchema = Body(...), current_user=Depends(auth_handler.auth_wrapper)):
    comment_details = jsonable_encoder(comment_details)
    new_comment = await add_comment(current_user, comment_details)
    return ResponseModel(new_comment, "Comment added successfully.")


@router.delete("/uncomment", response_description="Delete a comment from a post")
async def delete_comment_post_data(comment_id: str = Body(..., embed=True), current_user=Depends(auth_handler.auth_wrapper)):
    new_comment = await delete_comment(current_user, comment_id)
    return ResponseModel(new_comment, "Comment deleted successfully.")
