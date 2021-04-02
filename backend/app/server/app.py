from fastapi import FastAPI
# from fastapi.responses import HTMLResponse
from .routes.user import router as UserRouter
from .routes.users import router as UsersRouter
from .routes.post import router as PostRouter
from .routes.posts import router as PostsRouter
from .routes.like import router as LikeRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(UsersRouter, tags=["Users"], prefix="/users")
app.include_router(PostRouter, tags=["Post"], prefix="/post")
app.include_router(PostsRouter, tags=["Posts"], prefix="/posts")
app.include_router(LikeRouter, tags=["Like/Unlike"], prefix="/like_unlike")


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}


# @app.get("/")
# async def home():
#     data = {
#         "text": "hi"
#     }
#     return {"data": data}


# @app.get("/page/{page_name}")
# async def page(page_name: str):
#     data = {
#         "page": page_name
#     }
#     return {"data": data}
