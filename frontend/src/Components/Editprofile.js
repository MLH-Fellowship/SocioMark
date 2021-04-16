import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { navigate } from "hookrouter";
import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_USER_URL } from "../constants";
export default function EditProfile({
  open,
  setOpen,
  user,
  access,
  updateUserProfile,
}) {
  const initError = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    description: "",
  };

  const [form, setForm] = useState({
    name: user.name,
    description: user.description,
    email: user.email,
  });

  const [fileInterface, setFile] = useState({ fileUpload: null });
  const [error, setError] = useState(initError);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    var data = {
      name: form.name ?? user.name,
      description: form.description ?? user.description,
    };
    axios
      .patch(UPDATE_USER_URL, data, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + access,
        },
      })
      .then((resp) => {
        toast.success(resp.data.message);
        setOpen(false);
        updateUserProfile(data.name, data.description);
        setLoading(false);
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(JSON.stringify(response.data.detail));
        }
        setLoading(false);
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden"
        open={open}
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="absolute inset-y-0 right-0 pl-10 max-w-full  flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      className="text-gray-300 hover:text-white focus:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="35"
                        fill="currentColor"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Edit Profile
                    </Dialog.Title>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <div className="absolute inset-0 px-4 sm:px-6">
                      <div className="flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full">
                          <form
                            onSubmit={handleSubmit}
                            className="bg-white shadow rounded px-8 pt-6 pb-8 my-5 "
                          >
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
                                value={form.name ?? user.name}
                                type="name"
                                onChange={handleChange}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-indigo-100 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Name..."
                              />
                              <div className="text-xs italic text-red-500">
                                {error.name}
                              </div>
                            </div>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <input
                                readOnly="true"
                                aria-label="user name"
                                name="email"
                                value={user.email}
                                disabled
                                type="email"
                                onChange={handleChange}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-indigo-100 leading-tight focus:outline-none focus:shadow-outline"
                              />
                              <div className="text-xs italic text-red-500">
                                {error.email}
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
                                value={form.description ?? user.description}
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
                                Update
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
