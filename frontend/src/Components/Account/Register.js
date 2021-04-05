import React, { useState } from "react";
import { navigate } from "hookrouter";
import axios from "axios";
import { validateEmailAddress, validatePassword } from "../Utils/validations";
import { Loading } from "../Common/Loader";
import { toast } from "react-toastify";

export default function Register() {
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
      if (key != "description" && form[key] === "") {
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
        .post("http://localhost:8000/user/register", bodyFormData, {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          toast.success(resp.data.message);
          navigate("/login");
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
              className="bg-white shadow rounded px-8 pt-6 pb-8 my-5 lg:my-20"
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
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Describe Yourself..."
                />
                <div className="text-xs italic text-red-500">
                  {error.description}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  type="submit"
                  className="flex items-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  <svg
                    className="h-5 w-5 text-green-600 transition ease-in-out duration-150 mr-1"
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
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
