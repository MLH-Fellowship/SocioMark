import React, { useState } from "react";
import { navigate, A } from "hookrouter";
import axios from "axios";

export default function Register() {
  const initForm = {
    name: "",
    email: "",
    password: "",
    profile_picture: "",
    description: "",
  };
  //Confirm Password in BE and FE
  const [form, setForm] = useState(initForm);
  const [formError, setFormError] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    const FieldValue = { ...form };
    FieldValue[name] = value;
    setForm(FieldValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/register", { ...form })
      .then((resp) => {
        console.log("Registered succesfully");
      })
      .catch((err) => {
        setFormError(true);
      });
  };

  return (
    <div>
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
                value={form.profile_picture}
                onChange={handleChange}
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
            </div>

            {formError && (
              <div className="text-red-400 font-semibold">
                Invalid Credentials
              </div>
            )}
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
    </div>
  );
}
