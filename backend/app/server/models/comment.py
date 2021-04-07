from pydantic import BaseModel, Field


class CommentSchema(BaseModel):
    post_id: str = Field(...)
    user_id: str = Field(None)
    payload: str = Field(...)
    is_commented: bool = Field(True)

    class Config:
        schema_extra = {
            "example": {
                "post_id": "<post_id> to comment",
                "payload": "A nice comment"
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
