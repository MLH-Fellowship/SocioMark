import os

# Heroku uses Environment Variables instead of dot_env.
if os.getenv("HEROKU_DEPLOYMENT") is True:
    config = {
        "SECRET_KEY": os.getenv("SECRET_KEY"),
        "ALGORITHM": os.getenv("ALGORITHM"),
        "ACCESS_TOKEN_EXPIRE_MINUTES": os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"),
        "CLOUD_NAME": os.getenv("CLOUD_NAME"),
        "CLOUDINARY_API": os.getenv("CLOUDINARY_API"),
        "CLOUDINARY_API_SECRET": os.getenv("CLOUDINARY_API_SECRET"),
        "MONGODB_URL": os.getenv("MONGODB_URL"),
        "DEFAULT_AVATAR": os.getenv("DEFAULT_AVATAR"),
        "THRESHOLD": os.getenv("THRESHOLD")
    }

else:
    # strict imports
    from dotenv import dotenv_values, find_dotenv
    config = dotenv_values(find_dotenv())
