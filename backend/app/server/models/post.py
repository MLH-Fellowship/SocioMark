from typing import Optional
from pydantic import BaseModel, Field


class PostSchema(BaseModel):
    user_id: str = Field(None)
    report_counter: int = Field(0, ge=0)
    image: str = Field(...)
    user_sha: str = Field(None)
    description: str = Field(None)

    class Config:
        schema_extra = {
            "example": {
                "image": "url_of_image",
                "description": "This is a post by <user_id>"
            }
        }


class UpdatePostModel(BaseModel):
    post_id: str
    description: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "description": "This is a post by <user_id>"
            }
        }


def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
