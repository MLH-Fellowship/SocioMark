import React, { useState, useContext } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import axios from "axios";
import { A } from "hookrouter";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import Modal from "./Verification";
import "../../Styles/verification.css";

import {
  POST_UNCOMMENT_URL,
  POST_LIKE_UNLIKE_URL,
  POST_REPORT_URL,
  POST_REPORT_COOLDOWN,
  POST_VERIFY_URL,
  POST_EDIT_URL,
} from "../../constants";

export default function Post({ handleDeletePost, post_initializer }) {
  const { user, token } = useContext(AuthContext);
  const [access] = token;
  const [post, setPost] = useState(post_initializer);
  const [isUserEditingPost, setUserEditingPost] = useState(false);
  const [description, setDescription] = useState(post.description);
  const [fade, setFade] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleCreateComment = (new_comment) => {
    let new_post = Object.assign({}, post);
    new_post.comments.push(new_comment);
    setPost(new_post);
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditPost = (post_id) => {
    axios
      .patch(
        `${POST_EDIT_URL}`,
        { post_id, description },
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + access,
          },
        }
      )
      .then((res) => {
        let new_post = Object.assign({}, post);
        new_post.description = description;
        setPost(new_post);
        setUserEditingPost(false);
        toast.info(JSON.stringify(res.data.message));
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(JSON.stringify(response.data.detail));
        }
        setUserEditingPost(false);
      });
  };

  const handleLike = (post_id) => {
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
        if (res.data.data.to_delete === true) {
          var filtered_likes = new_post.likes.filter(function (el) {
            return el.like_id !== res.data.data.like_id;
          });
          new_post.likes = filtered_likes;
        } else {
          new_post.likes.push(res.data.data);
        }
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

  const handleReport = (post_id) => {
    axios
      .post(
        POST_REPORT_URL,
        { post_id },
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + access,
          },
        }
      )
      .then((res) => {
        toast.warn(JSON.stringify(res.data.message));
        setFade(true);
        setTimeout(() => {
          setFade(false);
        }, POST_REPORT_COOLDOWN);
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(JSON.stringify(response.data.detail));
        }
      });
  };

  function handleVerify(post_id) {
    axios
      .post(
        POST_VERIFY_URL,
        { post_id },
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + access,
          },
        }
      )
      .then((res) => {
        let details = res.data.data;
        if (details.is_authentic === true) {
          toast.success(JSON.stringify(res.data.message));
        } else {
          toast.warn(JSON.stringify(res.data.message));
          setModalText(
            "Original Author: " +
              details.author_name +
              " (" +
              details.author_email +
              ")"
          );
          setShowModal(true);
        }
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(JSON.stringify(response.data.detail));
        }
      });
  }

  return (
    <div>
      <div className="justify-center">
        <div className="bg-white shadow border mt-4 ">
          <div className="flex justify-between w-full items-center px-4">
            <A href={`/user/${post.user_id}`}>
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
            </A>
            <div className="flex items-center gap-x-4">
              <div className="flex gap-x-2 items-center ">
                <A
                  href="#"
                  title="Like"
                  onClick={() => {
                    handleLike(post.post_id);
                  }}
                >
                  {likesContainID(post.likes, user[0].user_id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      fill="red"
                      className="bi bi-heart-fill"
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
                {post.likes.length > 0 && (
                  <p>
                    {post.likes.length}{" "}
                    {post.likes.length === 1 ? "like" : "likes"}{" "}
                  </p>
                )}
              </div>
              {fade ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  fill="gray"
                  className="bi bi-flag-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                </svg>
              ) : (
                <A
                  href="#"
                  title="Report"
                  onClick={() => {
                    handleReport(post.post_id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    fill="currentColor"
                    className="bi bi-flag-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                  </svg>
                </A>
              )}
              {user[0].user_id === post.user_id && (
                <A
                  href="#"
                  title="Delete"
                  onClick={() => handleDeletePost(post.post_id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    fill="red"
                    class="bi bi-trash-fill opacity-50 hover:opacity-100"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </A>
              )}
            </div>
          </div>
          <div className="mx-auto container">
            <img
              alt="post_image"
              src={post.image}
              className="relative w-full object-contain h-std  shadow-lg post"
            />
            <div className="middle">
              {showModal ? (
                <Modal
                  onClose={() => {
                    setShowModal(!showModal);
                  }}
                  show={showModal}
                >
                  {modalText}
                </Modal>
              ) : (
                <button
                  className="button"
                  onClick={() => {
                    handleVerify(post.post_id);
                  }}
                >
                  <span>Verify!</span>
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-between w-full items-center px-4">
            {user[0].user_id == post.user_id ? (
              !isUserEditingPost ? (
                <>
                  {post.description}
                  <svg
                    onClick={() => setUserEditingPost(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-pencil-fill clickable"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </>
              ) : (
                <>
                  <textarea
                    aria-label="description"
                    onChange={handleChange}
                    name="description"
                    value={description}
                    type="description"
                    className="edit-post-area appearance-none block w-full bg-white text-blue-900 font-normal border border-blue-400 rounded py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    placeholder="Add a description for your post..."
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleEditPost(post.post_id)}
                    width="35"
                    height="35"
                    fill="green"
                    class="bi bi-check-circle clickable"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                  </svg>
                </>
              )
            ) : (
              <>{post.description}</>
            )}
          </div>
          {post.comments.map((comment) => {
            return (
              <Comment
                key={comment.comment_id}
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
