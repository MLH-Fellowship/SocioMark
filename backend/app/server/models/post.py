from typing import Optional
from pydantic import BaseModel, Field


class PostSchema(BaseModel):
    user_id: str = Field(...)
    report_counter: int = Field(..., ge=0)
    image: str = Field(...)
    description: str = Field(None)

    class Config:
        schema_extra = {
            "example": {
                "user_id": "user_id",
                "report_counter": 0,
                "image": "url_of_image",
                "description": "This is a post by <user_id>"
            }
        }


class UpdatePostModel(BaseModel):
    post_id: Optional[str]
    user_id: Optional[str]
    report_counter: Optional[int]
    image: Optional[str]
    description: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "user_id": "user_id",
                "report_counter": 0,
                "image": "url_of_image",
                "description": "This is a post by <user_id>"
            }
        }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
