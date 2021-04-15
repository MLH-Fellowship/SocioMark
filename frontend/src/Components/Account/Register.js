import React, { useState } from "react";
import { navigate } from "hookrouter";
import axios from "axios";
import { validateEmailAddress, validatePassword } from "../Utils/validations";
import { Loading } from "../Common/Loader";
import { toast } from "react-toastify";
import { REGISTER_URL } from "../../constants";

export default function Register({ onToggle }) {
  const initForm = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    description: "",
  };

  const initError = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    description: "",
  };

  const [form, setForm] = useState(initForm);
  const [fileInterface, setFile] = useState({ fileUpload: null });
  const [error, setError] = useState(initError);
  const [loading, setLoading] = useState(false);

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);
    const { password, confirm_password, email } = form;

    Object.keys(form).forEach((key) => {
      if (key !== "description" && form[key] === "") {
        formValid = false;
        err[key] = "This field is required";
      }
    });

    if (password !== confirm_password) {
      err["confirm_password"] = "Passwords do not match";
      formValid = false;
    }

    if (!validateEmailAddress(email)) {
      err["email"] = "Enter a valid email";
      formValid = false;
    }

    if (password.length < 8) {
      err["password"] = "Must be atleast 8 characters";
      formValid = false;
    } else if (!validatePassword(password)) {
      err["password"] =
        "Password must contain at least one uppercase, one lowercase, a digit and a symbol";
      formValid = false;
    }

    setError(err);
    return formValid;
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    const FieldValue = { ...form };
    FieldValue[name] = value;
    setForm(FieldValue);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile({
      fileUpload: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validInputs() && !loading) {
      setLoading(true);
      var bodyFormData = new FormData();
      bodyFormData.append("name", form.name);
      bodyFormData.append("email", form.email);
      bodyFormData.append("password", form.password);
      bodyFormData.append("confirm_password", form.confirm_password);
      bodyFormData.append("description", form.description);
      if (fileInterface.fileUpload) {
        bodyFormData.append("image", fileInterface.fileUpload);
      }
      axios
        .post(REGISTER_URL, bodyFormData, {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          setForm(initForm);
          toast.success(resp.data.message);
          navigate("/home");
          onToggle();
          setLoading(false);
        })
        .catch(({ response }) => {
          if (response) {
            toast.error(JSON.stringify(response.data.detail));
          }
          setLoading(false);
        });
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow rounded px-8 pt-6 pb-8 my-5 "
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Profile Picture
                </label>
                <input
                  aria-label="profile_picture"
                  name="profile_picture"
                  onChange={handleFileUpload}
                  type="file"
                  accept="image/*"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-indigo-100 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Name
                </label>
                <input
                  aria-label="name"
                  name="name"
                  value={form.name}
                  type="name"
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-indigo-100 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Name..."
                />
                <div className="text-xs italic text-red-500">{error.name}</div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  aria-label="user name"
                  name="email"
                  value={form.email}
                  type="email"
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-indigo-100 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
                <div className="text-xs italic text-red-500">{error.email}</div>
              </div>
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  aria-label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-indigo-100 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="******"
                />
                <div className="text-xs italic text-red-500">
                  {error.password}
                </div>
              </div>
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirm_password"
                >
                  Confirm Password
                </label>
                <input
                  aria-label="confirm_password"
                  name="confirm_password"
                  type="password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-indigo-100 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="******"
                />
                <div className="text-xs italic text-red-500">
                  {error.confirm_password}
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Description
                </label>
                <textarea
                  aria-label="description"
                  name="description"
                  value={form.description}
                  type="description"
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-indigo-100 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Describe Yourself..."
                />
                <div className="text-xs italic text-red-500">
                  {error.description}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4">
                <button
                  type="submit"
                  className="w-full sm:w-1/3 flex items-center bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  <svg
                    className="h-5 w-5 text-indigo-700 transition ease-in-out duration-150 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Register
                </button>
                <div className="flex-col font-semibold text-sm mx-2 pt-2 text-indigo-800">
                  <div className="flex gap-x-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="bi bi-exclamation-triangle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    <p>Already have an account?</p>
                  </div>
                  <button
                    className="font-semibold"
                    onClick={() => {
                      onToggle();
                    }}
                  >
                    <div className="flex items-center gap-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        fill="currentColor"
                        className="bi bi-link-45deg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z" />
                      </svg>
                      <div>Login here</div>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
