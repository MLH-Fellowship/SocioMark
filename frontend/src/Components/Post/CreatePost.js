import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loading } from "../Common/Loader";
import { AuthContext } from "../../Context/AuthContext";
import { POST_CREATE_URL } from "../../constants";

export default function CreatePost({ handleCreatePost }) {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState({ fileUpload: null });
  const { token } = useContext(AuthContext);
  const [access] = token;
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [preview, setPreview] = useState();

  const handleClick = (_event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileUpload = (e) => {
    if (!e.target.files[0]) return;

    const file = e.target.files[0];
    setFile({
      fileUpload: file,
    });
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("description", description);
    if (file.fileUpload) {
      bodyFormData.append("image", file.fileUpload);
    }
    axios
      .post(POST_CREATE_URL, bodyFormData, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + access,
        },
      })
      .then((res) => {
        setDescription("");
        setLoading(false);
        toast.success(JSON.stringify(res.data.message));
        handleCreatePost(res.data.data);
        setPreview(null);
        setDescription("");
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(JSON.stringify(response.data.detail));
        }
        setPreview(null);
        setDescription("");
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="relative bg-white shadow rounded-lg">
            <div className="flex w-full flex-col p-4 md:p-6">
              <textarea
                aria-label="description"
                onChange={handleChange}
                name="description"
                value={description}
                type="description"
                className="appearance-none block w-full bg-white text-blue-900 font-normal border border-blue-400 rounded py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                placeholder="Add a description for your post..."
              />
              {preview && (
                <div className="flex w-full h-30 placeholder-red-300 flex-col p-4 md:p-6">
                  <img
                    src={preview}
                    class="hover:opacity-60 hover:bg-white  duration-300 text-black font-semibold"
                    title="Preview"
                  />
                </div>
              )}
              <div className="md:flex justify-between items-center">
                <div className="md:w-2/3">
                  <span className="w-full">
                    <button
                      className="w-50 bg-blue-800 p-3 rounded-3xl focus:outline-none"
                      onClick={handleClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="white"
                        class="bi bi-file-earmark-arrow-up"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                      </svg>
                    </button>
                    <input
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                      name="profile_picture"
                      onChange={handleFileUpload}
                      type="file"
                      accept="image/*"
                      className="appearance-none w-full border rounded py-2 px-3 text-blue-700 bg-blue-50 leading-tight focus:outline-none focus:shadow-outline"
                    />{" "}
                  </span>
                </div>
                <div className="sm:w-1/4 w-1/3 mt-2 md:mt-0">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-900 w-full hover:bg-blue-700 text-center text-xl font-semibold text-white rounded-md p-2 mt-2 md:mt-0"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
