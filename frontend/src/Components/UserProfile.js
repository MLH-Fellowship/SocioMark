import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GET_USER_DETAILS_URL } from "../constants";
import { Loading } from "../Components/Common/Loader";
import Post from "./Post/Post";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import EditProfile from "./Editprofile";

export default function UserProfile({ id }) {
  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const user_id = user[0].user_id;

  useEffect(() => {
    setLoading(true);
    axios
      .get(GET_USER_DETAILS_URL + `${id}`)
      .then((res) => {
        setLoading(false);
        setUserProfile(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("No user found with the ID"); //catch error in backend and update here
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
                  src={userProfile.profile_picture}
                  alt="Profile_Picture"
                />
              </div>
            </div>

            <div className="flex flex-col w-full md:w-4/5 mx-auto py-2 text-center items-center">
              <div className="text-left pl-4 pt-3 text-center w-2/3">
                <span className="text-base text-gray-700 text-3xl">
                  {userProfile.name}
                </span>
              </div>

              <div className="text-left pl-4 pt-3 text-center w-4/5">
                <p className="text-base font-medium text-black-700 mr-2 box-content text-xl font-mono ">
                  {userProfile.description}
                </p>
              </div>
            </div>

            <div className="text-left text-center w-1/2 mx-auto">
              {userProfile.user_id === user_id && (
                <button
                  onClick={() => setOpen(true)}
                  className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-6 border border-gray-600 hover:border-transparent rounded"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {userProfile?.posts && (
            <div className="flex flex-col sm:2/3 w-full pt-10 items-start">
              <div className="flex-1 text-center px-4 py-2 m-2 max-w-3xl">
                {userProfile.posts.map((post) => {
                  return <Post key={post.post_id} post_initializer={post} />;
                })}
              </div>
            </div>
          )}
        </div>
      )}
      <EditProfile
        open={open}
        setOpen={setOpen}
        initForm={{
          name: userProfile.name ?? "",
          description: userProfile.description ?? "",
          email: userProfile.email,
        }}
      />
    </div>
  );
}
