import React, { useState, useContext } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import axios from "axios";
import { A } from "hookrouter";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { POST_UNCOMMENT_URL, POST_LIKE_UNLIKE_URL } from "../../constants";

export default function Post({ post_initializer }) {
  const { user, token } = useContext(AuthContext);
  const [access] = token;
  const [post, setPost] = useState(post_initializer);

  const handleCreateComment = (new_comment) => {
    let new_post = Object.assign({}, post);
    new_post.comments.push(new_comment);
    setPost(new_post);
  };

  const handleLike = (post_id) => {
    console.log(post_id);
    axios
      .post(
        POST_LIKE_UNLIKE_URL,
        { post_id },
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + access,
          },
        }
      )
      .then((res) => {
        toast.info(JSON.stringify(res.data.message));
        let new_post = Object.assign({}, post);
        if (res.data.data.to_delete === false) {
          console.log("Deleting", res.data.data);
          var filtered_likes = new_post.likes.filter(function (el) {
            return el.like_id !== res.data.data.like_id;
          });
          new_post.likes = filtered_likes;
        } else {
          console.log("Adding", res.data.data);
          new_post.likes.push(res.data.data);
        }
        console.log(new_post.likes);
        setPost(new_post);
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(JSON.stringify(response.data.detail));
        }
      });
  };

  function likesContainID(likes_list, user_id) {
    return likes_list.some((el) => el.user_id === user_id);
  }

  const handleDeleteComment = (comment_id) => {
    axios
      .delete(POST_UNCOMMENT_URL, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + access,
        },
        data: { comment_id },
      })
      .then((res) => {
        toast.info(JSON.stringify(res.data.message));
        let new_post = Object.assign({}, post);
        var filtered_comments = new_post.comments.filter(function (el) {
          return el.comment_id !== comment_id;
        });
        new_post.comments = filtered_comments;
        setPost(new_post);
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(JSON.stringify(response.data.detail));
        }
      });
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto justify-center">
        <div className="bg-white shadow border mt-4 ">
          <div className="flex justify-between w-full items-center px-4">
            <div className="flex">
              <img
                alt="author_image"
                src={post.author_image}
                className="rounded-full my-2 h-10 w-10 shadow"
              />
              <h3 className="text-xl  font-bold px-2 py-4">
                {post.author_name}
              </h3>
            </div>
            <div className="flex gap-x-6">
              { post.likes.length }
              <A
                href="#"
                onClick={() => {
                  handleLike(post.post_id);
                }}
              >
                {likesContainID(post.likes, user[0].user_id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    fill="red"
                    class="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    fill="currentColor"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                )}
              </A>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                fill="currentColor"
                className="bi bi-flag-fill"
                viewBox="0 0 16 16"
              >
                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
              </svg>
            </div>
          </div>
          <div className="mx-auto">
            <img
              alt="post_image"
              src={post.image}
              className="relative w-full object-contain h-std  shadow-lg"
            />
          </div>
          <div className="px-2 py-1 text-md font-normal mt-1">
            <span className="font-semibold">@{post.author_name}: </span>
            {post.description}
          </div>
          {post.comments.map((comment) => {
            return (
              <Comment
                handleDeleteComment={handleDeleteComment}
                comment={comment}
              />
            );
          })}
          <CreateComment
            handleCreateComment={handleCreateComment}
            post={post}
          />
        </div>
      </div>
    </div>
  );
}
