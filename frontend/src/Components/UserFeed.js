import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Post from "./Post/Post";
import CreatePost from "./Post/CreatePost";
import { AuthContext } from "../Context/AuthContext";
import { Loading } from "../Components/Common/Loader";
import { POST_GET_ALL_URL, USER_SUGGESTIONS } from "../constants";
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
        setPosts(res.data.data);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSuggestionLoading(true);
    axios.get(USER_SUGGESTIONS).then((res) => {
      setSuggestedUsers(res.data.data);
      setSuggestionLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreatePost = (new_post) => {
    const new_posts = [new_post, ...posts];
    setPosts(new_posts);
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
              return <Post post_initializer={post} />;
            })}
          </div>
          <div className="sm:w-1/3 sm:max-w-sm mt-4 sm:mt-1 w-full pb-4 h-full sticky top-4  rounded-lg bg-white overflow-hidden shadow">
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-900">
                Suggestions
              </h2>
            </div>
            {suggestedUsers.map((user) => {
              return <Suggestions user={user} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
