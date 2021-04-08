from fastapi import File, UploadFile
import cloudinary
import cloudinary.uploader
import cloudinary.api
from ..config import config


cloudinary.config(
    cloud_name=config["CLOUD_NAME"],
    api_key=config["CLOUDINARY_API"],
    api_secret=config["CLOUDINARY_API_SECRET"]
)


def upload_image(image: UploadFile = File(...)):
    result = cloudinary.uploader.upload(image.file)
    return result["url"]
