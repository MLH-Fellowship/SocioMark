import React, { useState,useEffect } from "react";
import axios from "axios"
import { GET_USER_DETAILS } from "../constants";
import { Loading } from "../Components/Common/Loader";
import Post from "./Post/Post";

export default function UserProfile({ id }) {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(GET_USER_DETAILS+`${id}`)
      .then((res) => {
        
        setLoading(false);
        setUser(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
          console.log("User Not found"); //catch error in backend and update here
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
    {loading ? (
      <Loading />
    ) : (
      <div className="flex flex-col sm:flex-row mx-auto h-auto justify-center">
        <div className="flex md:flex-col flex-wrap w-full sm:w-1/2 items-center pt-20 ">
          <div className="flex flex-col md:w-1/2 items-center mx-auto">
            <div className=" items-center">
              <img
                className="h-40 w-40 border-black border-2 rounded-full"
                src={user.profile_picture}
                alt
              />
            </div>
          </div>

          <div className="flex flex-col w-full md:w-4/5 mx-auto py-2 text-center items-center">
            <div className="text-left pl-4 pt-3 text-center w-2/3">
              <span className="text-base text-gray-700 text-3xl">
                {user.name}
              </span>
            </div>

            <div className="text-left pl-4 pt-3 text-center w-4/5">
              <p className="text-base font-medium text-black-700 mr-2 box-content text-xl font-mono ">
                {user.description}
              </p>
            </div>
          </div>

          <div className="text-left text-center w-1/2 mx-auto">
            <button className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-6 border border-gray-600 hover:border-transparent rounded">
              Edit Profile
            </button>
          </div>
        </div>

          {user?.posts &&
            <div className="flex flex-col sm:2/3 w-full pt-10 items-start">
            <div className="flex-1 text-center px-4 py-2 m-2 max-w-3xl">
              { user.posts
                .map((post) => {
                  return <Post post_initializer={post} />;
                })}
            </div>
          </div>

          }
        </div>
      )}
    </div>
  );
}
