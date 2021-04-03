from fastapi import File, UploadFile
import cloudinary
import cloudinary.uploader
import cloudinary.api
from dotenv import dotenv_values, find_dotenv
import os
config = dotenv_values(find_dotenv())

cloudinary.config(
    cloud_name=os.environ.get("CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET")
)


def upload_image(image: UploadFile = File(...)):
    result = cloudinary.uploader.upload(image.file)
    return result["url"]
