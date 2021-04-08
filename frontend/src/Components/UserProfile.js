import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Post from "./Post/Post";
import axios from "axios";
import { Loading } from "../Components/Common/Loader";
import { POST_GET_ALL_URL } from "../constants";

export default function UserProfiele() {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(POST_GET_ALL_URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setPosts(res.data.data);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col sm:flex-row mx-auto bg-white h-auto text-xl justify-center">
          <div className="flex md:flex-col flex-wrap w-full sm:w-1/2 items-center pt-20 ">
            <div className="flex flex-col md:w-1/2 items-center mx-auto">
              <div className=" items-center">
                <img
                  className="h-40 w-40 border-black border-2 rounded-full"
                  src={user[0].profile_picture}
                  alt
                />
              </div>
            </div>

            <div className="flex flex-col w-full md:w-4/5 mx-auto py-2 text-center items-center">
              <div className="text-left pl-4 pt-3 text-center w-2/3">
                <span className="text-base text-gray-700 text-3xl">
                  {user[0].name}
                </span>
              </div>

              <div className="text-left pl-4 pt-3 text-center w-4/5">
                <p className="text-base font-medium text-black-700 mr-2 box-content text-xl font-mono ">
                  {user[0].description}
                </p>
              </div>
            </div>

            <div className="text-left text-center w-1/2 mx-auto">
              <button className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-6 border border-gray-600 hover:border-transparent rounded">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:2/3 w-full pt-20 items-start">
            <div className="flex-1 text-center px-4 py-2 m-2">
              {posts
                .filter((posts) => posts.user_id === user[0].user_id)
                .map((post) => {
                  return <Post post_initializer={post} />;
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
