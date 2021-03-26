from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class UserSchema(BaseModel):
    name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    profile_picture: str = Field(None)
    description: str = Field(None)

    class Config:
        schema_extra = {
            "example": {
                "name" : "John Doe",
                "email": "jdoe@x.edu.ng",
                "password": "encrypted_password",
                "profile_picture": "url_of_image",
                "description": "This is John Doe"
            }
        }


class UpdateUserModel(BaseModel):
    email: Optional[EmailStr]
    password: Optional[str]
    profile_picture: Optional[str]
    description: Optional[str]


    class Config:
        schema_extra = {
            "example": {
                "email": "jdoe@x.edu.ng",
                "password": "encrypted_password",
                "profile_picture": "url_of_image",
                "description": "This is John Doe"
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
