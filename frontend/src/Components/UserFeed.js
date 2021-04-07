import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Post from "./Post/Post";
import CreatePost from "./Post/CreatePost";
import { AuthContext } from "../Context/AuthContext";
import { Loading } from "../Components/Common/Loader"


export default function UserFeed() {
  const {  value2 } = useContext(AuthContext);
  const [access] = value2;
  const [posts,setPosts] = useState([])
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8000/post/all",{
      headers: {
        Authorization: "Bearer " + access,
      }}).then(res => {
    setPosts(res.data.data);
    setLoading(false);

  })
}, []);


  return (
    <div>
      {loading? <Loading/> : <div>
        <div className="max-w-5xl mx-auto p-2">
        <CreatePost />
      </div>
      {posts.reverse().map((post) => {
        return <Post post={post}/>
      })}
        </div>
      }
    </div>
  );
}