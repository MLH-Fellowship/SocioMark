from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from .routes.user import router as UserRouter
from .routes.post import router as PostRouter
from .routes.suggestions import router as SuggestionsRouter
from .routes.like import router as LikeRouter
from .routes.comment import router as CommentRouter
from .routes.verify import router as VerificationRouter
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


# Include Likes and Comments Router within Post
PostRouter.include_router(LikeRouter, prefix="")
PostRouter.include_router(CommentRouter, prefix="")

# Three major tags
app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(PostRouter, tags=["Post"], prefix="/post")
app.include_router(SuggestionsRouter, tags=["Suggestions"], prefix="/suggestions")
app.include_router(VerificationRouter, tags=["Verification"], prefix="/verify")


@app.get("/", tags=["Root"])
async def read_root():
    return HTMLResponse(
        """
        <style>
            html {
                background: cornsilk;
            }
            .heading {
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-family: 'K2D'
            }
        </style>
        <heading>
            <link href="https://fonts.googleapis.com/css?family=K2D:300,400,500,700,800" rel="stylesheet">
        </heading>
        <div class="heading">
            <h1>You are visiting SocioMark's Backend.<h1>
            <h3>visit <a href="/docs">/docs</a> for more info<h3>
        </div>
        """
    )
