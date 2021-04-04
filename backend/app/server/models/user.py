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
                "name": "John Doe",
                "email": "jdoe@x.edu.ng",
                "password": "password",
                "profile_picture": "url_of_image",
                "description": "This is John Doe"
            }
        }


class LoginSchema(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "email": "jdoe@s.edu.org",
                "password": "Jdoe@123"
            }
        }


class UpdateUserModel(BaseModel):
    name: Optional[str]
    password: Optional[str]
    profile_picture: Optional[str]
    description: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "password": "password",
                "profile_picture": "url_of_image",
                "description": "This is John Doe"
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
