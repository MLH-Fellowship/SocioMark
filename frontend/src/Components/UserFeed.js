import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Post from "./Post/Post";
import CreatePost from "./Post/CreatePost";
import { AuthContext } from "../Context/AuthContext";
import { Loading } from "../Components/Common/Loader";
import { POST_GET_ALL_URL } from "../constants";

export default function UserFeed() {
  const { token } = useContext(AuthContext);
  const [access] = token;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleCreatePost = (new_post) => {
    const new_posts = [new_post, ...posts];
    setPosts(new_posts);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="max-w-5xl mx-auto p-2">
            <CreatePost handleCreatePost={handleCreatePost} />
          </div>
          {posts.map((post) => {
            return <Post post_initializer={post} />;
          })}
        </div>
      )}
    </div>
  );
}
