import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Post from "./Post/Post";
import CreatePost from "./Post/CreatePost";
import { AuthContext } from "../Context/AuthContext";
import { Loading } from "../Components/Common/Loader";
import { toast } from "react-toastify";
import {
  POST_GET_ALL_URL,
  USER_SUGGESTIONS_URL,
  POST_DELETE_URL,
} from "../constants";
import Suggestions from "./Suggestions";

export default function UserFeed() {
  const { token } = useContext(AuthContext);
  const [access] = token;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(POST_GET_ALL_URL, {
        headers: {
          Authorization: "Bearer " + access,
        },
      })
      .then((res) => {
        setPosts(res.data.data.reverse());
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSuggestionLoading(true);
    axios.get(USER_SUGGESTIONS_URL).then((res) => {
      setSuggestedUsers(res.data.data);
      setSuggestionLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  const handleCreatePost = (new_post) => {
    const new_posts = [new_post, ...posts];
    setPosts(new_posts);
  };

  const handleDeletePost = (post_id) => {
    axios
      .delete(POST_DELETE_URL, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + access,
        },
        data: { post_id },
      })
      .then((res) => {
        toast.info(JSON.stringify(res.data.message));
        const filtered_posts = posts.filter(function (el) {
          return el.post_id !== post_id;
        });
        setPosts(filtered_posts);
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(JSON.stringify(response.data.detail));
        }
      });
  };

  return (
    <div>
      {loading || suggestionLoading ? (
        <Loading />
      ) : (
        <div className="w-full sm:flex pt-6 justify-center gap-x-6">
          <div className="max-w-2xl sm:w-2/3 w-full mt-1">
            <CreatePost handleCreatePost={handleCreatePost} />
            {posts.map((post) => {
              return (
                <Post
                  key={post.post_id}
                  post_initializer={post}
                  handleDeletePost={handleDeletePost}
                />
              );
            })}
          </div>
          <div className="sm:w-1/3 sm:max-w-sm mt-4 sm:mt-1 w-full pb-4 h-full sticky top-4  rounded-lg bg-white overflow-hidden shadow">
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-900">Suggestions</h2>
            </div>
            {suggestedUsers.map((user) => {
              return <Suggestions key={user.user_id} user={user} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
