import React, { useState } from "react";
import { navigate, A } from "hookrouter";
import axios from "axios";
import { Loading } from "../Common/Loader";
import { toast } from "react-toastify";
import { LOGIN_URL } from "../../constants";
import Button from "react-bootstrap/Button";
import Explore from "./Explore";

export default function Home() {
  const initForm = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initForm);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    const FieldValue = { ...form };
    FieldValue[name] = value;
    setForm(FieldValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(LOGIN_URL, { ...form })
      .then((resp) => {
        toast.success(JSON.stringify(resp.data.message));
        localStorage.setItem("access_token", resp.data.data.access_token);
        navigate("/home");
        setLoading(false);
        window.location.reload();
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(JSON.stringify(response.data.detail));
        }
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-purple lg:bg-login-img flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="text-center text-5xl text-white">Welcome to</div>
            <div className="text-center text-7xl mt-6 text-white">
              SocioMark
            </div>
            <div className="text-center text-4xl mt-10 text-black">
              Login to Continue
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-transparent shadow rounded px-8 pt-6 pb-8 mt-3"
            >
              <div className="mb-4">
                <label
                  className="block text-black text-base font-bold mb-3"
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
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline mb-3"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-2">
                <label
                  className="block text-black text-base font-bold mb-3"
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
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline mb-3"
                  placeholder="********"
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="flex items-center bg-black hover:bg-gray-700 text-white hover:text-black font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline"
                >
                  <svg
                    className="h-5 w-5 text-white hover:text-black transition ease-in-out duration-150 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign In
                </button>
              </div>
            </form>
            <div className="text-2xl text-center text-black mt-3">
              Don't have an account?{" "}
            </div>
            <div className="flex items-center justify-center">
              <Explore show={modalShow} onHide={() => setModalShow(false)} />
              <div>
                <Button
                  variant="outline-light"
                  size="lg"
                  className="mt-5"
                  onClick={() => setModalShow(true)}
                >
                  Explore More
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  href="/register"
                  className="mt-5 ml-5"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
