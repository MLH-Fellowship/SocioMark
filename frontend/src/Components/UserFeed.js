import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Post from "./Post/Post";
import CreatePost from "./Post/CreatePost";
import { AuthContext } from "../Context/AuthContext";


export default function UserFeed() {
  const {  value2 } = useContext(AuthContext);
  const [access] = value2;
  const [posts,setPosts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/post/all",{
      headers: {
        Authorization: "Bearer " + access,
      }}).then(res => {
    setPosts(res.data.data);
  })
}, []);
  return (
    <div>
      <div className="max-w-5xl mx-auto p-2">
        <CreatePost />
      </div>
      {posts.reverse().map((post) => {
        return <Post post={post}/>
      })}
    </div>
  );
}