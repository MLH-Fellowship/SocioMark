from io import BytesIO
import requests
import numpy as np
import cv2
from PIL import Image
from bson import ObjectId
from ..database import posts_collection, users_collection
from .steganography.transforms import arnold
from .steganography.encode import watermark, recover
from .steganography.decode import sha_extract
from .steganography.hash import hash_sha_info


# helpers


def verify_helper(post, user, is_authentic) -> dict:
    return {
        "post_id": str(post["_id"]),
        "author_id": str(user["_id"]),
        "author_name": user["name"],
        "author_email": user["email"],
        "author_image": user["profile_picture"],
        "is_authentic": is_authentic
    }


async def encode_image(rgb_image, info: list):
    height = rgb_image.shape[0]
    width = rgb_image.shape[1]

    # do an arnold transformation
    arnold_transformed = arnold(rgb_image, height, width)

    # watermark the image with user's info
    watermark(arnold_transformed, info)
    encoded_image = recover(arnold_transformed, height, width)

    return encoded_image


async def decode_image(rgb_image):
    height = rgb_image.shape[0]
    width = rgb_image.shape[1]

    # do an arnold transformation
    arnold_transformed = arnold(rgb_image, height, width)
    embedded_sha = sha_extract(arnold_transformed)

    return embedded_sha


async def verify_post(post_id: str):
    post = await posts_collection.find_one({"_id": ObjectId(post_id)})
    user_sha, _ = hash_sha_info(str(post["user_id"]))

    response = requests.get(post["image"])
    pil_image = Image.open(BytesIO(response.content))
    rgb_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

    embedded_sha = await decode_image(rgb_image)

    if embedded_sha == user_sha:
        user = await users_collection.find_one({"_id": post["user_id"]})
        return verify_helper(post, user, True)
    else:
        original_post_exists = await posts_collection.find_one({"user_sha": embedded_sha})
        if not original_post_exists:
            user = await users_collection.find_one({"_id": post["user_id"]})
            return verify_helper(post, user, True)
        user = await users_collection.find_one({"_id": original_post_exists["user_id"]})
        return verify_helper(original_post_exists, user, False)
