import cv2
import numpy as np
from PIL import Image

from .steganography.transforms import arnold
from .steganography.encode import watermark, recover
from starlette.datastructures import UploadFile


# helpers


def verify_helper(user, comment) -> dict:
    return {
        "comment_id": str(comment["_id"]),
        "user_id": str(user["_id"]),
        "name": user["name"],
        "profile_picture": user["profile_picture"],
        "payload": comment["payload"]
    }


async def encode_image(image: UploadFile, info: list):
    pil_image = Image.open(image.file)
    rgb_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
    height = rgb_image.shape[0]
    width = rgb_image.shape[1]

    # do an arnold transformation
    arnold_transformed = arnold(rgb_image, height, width)

    # watermark the image with user's info
    watermark(arnold_transformed, info)
    encoded_image = recover(arnold_transformed, height, width)

    return encoded_image


async def decode_image(image_url: str):
    pass
