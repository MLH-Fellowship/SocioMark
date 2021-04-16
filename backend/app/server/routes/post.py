from fastapi import APIRouter, Body, Depends, status
from fastapi.encoders import jsonable_encoder
from fastapi import UploadFile, File, Form
from ..controllers.auth import auth_handler

from ..controllers.post import (
    add_post,
    delete_post,
    retrieve_post,
    retrieve_all_posts,
    update_post,
    report_post
)
from ..models.post import (
    ResponseModel,
    UpdatePostModel,
)

router = APIRouter()


@router.post("/create", response_description="Post added into the database", status_code=status.HTTP_201_CREATED)
async def add_post_data(image: UploadFile = File(...), description: str = Form(None), current_user=Depends(auth_handler.auth_wrapper)):
    post = {
        "report_counter": 0,
        "image": image,
        "description": description
    }
    new_post = await add_post(current_user, post)
    return ResponseModel(new_post, "Post created successfully.")


@router.delete("/delete", response_description="Delete post from the database")
async def delete_post_data(post_id: str = Body(..., embed=True), current_user=Depends(auth_handler.auth_wrapper)):
    new_post = await delete_post(current_user, post_id)
    return ResponseModel(new_post, "Post deleted successfully.")


@router.patch("/update", response_description="Update post")
async def update_post_data(updated_post: UpdatePostModel = Body(...), current_user=Depends(auth_handler.auth_wrapper)):
    updated_post = jsonable_encoder(updated_post)
    new_post = await update_post(current_user, updated_post["post_id"], updated_post)
    return ResponseModel(new_post, "Post updated successfully.")


@router.post("/report", response_description="Report post")
async def report_post_data(post_id: str = Body(..., embed=True)):
    new_post = await report_post(post_id)
    return ResponseModel(new_post, "Post reported successfully.")


@router.get("/details", response_description="Get post details from the database")
async def details_post_data(post_id: str = Body(..., embed=True)):
    new_post = await retrieve_post(post_id)
    return ResponseModel(new_post, "Got post details successfully.")


@router.get("/all", response_description="Get all the posts from the database")
async def details_all_posts_data(current_user=Depends(auth_handler.auth_wrapper)):
    all_posts = await retrieve_all_posts()
    return ResponseModel(all_posts, "Got all posts successfully.")
