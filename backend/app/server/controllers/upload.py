from fastapi import File, UploadFile
import cloudinary
import cloudinary.uploader
import cloudinary.api
from dotenv import dotenv_values, find_dotenv

config = dotenv_values(find_dotenv())

cloudinary.config(
    cloud_name=config["CLOUD_NAME"],
    api_key=config["CLOUDINARY_API"],
    api_secret=config["CLOUDINARY_API_SECRET"]
)


def upload_image(image: UploadFile = File(...)):
    result = cloudinary.uploader.upload(image.file)
    return result["url"]
