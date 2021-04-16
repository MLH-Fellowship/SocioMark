import React, { useState, useEffect } from "react";
import { A, navigate } from "hookrouter";
import { USER_SUGGESTIONS_URL } from "../../constants";
import axios from "axios";

export default function Navbar({ links, logout }) {
  const [shown, setShown] = useState(false);

  const iconForTitle = (title) => {
    switch (title) {
      case "Home":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            fill="currentColor"
            className="bi bi-house-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
            />
            <path
              fillRule="evenodd"
              d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
            />
          </svg>
        );
      case "Profile":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        );
      case "Logout":
        return (
          <svg
            aria-hidden="true"
            width="20"
            focusable="false"
            data-prefix="fas"
            data-icon="sign-out-alt"
            className="svg-inline--fa fa-sign-out-alt fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
            ></path>
          </svg>
        );
      case "Login":
        return (
          <svg
            aria-hidden="true"
            width="20"
            focusable="false"
            data-prefix="fas"
            data-icon="sign-in-alt"
            className="svg-inline--fa fa-sign-in-alt fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"
            ></path>
          </svg>
        );
      case "Register":
        return (
          <svg
            aria-hidden="true"
            width="22"
            focusable="false"
            data-prefix="fas"
            data-icon="user-plus"
            className="svg-inline--fa fa-user-plus fa-w-20"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path
              fill="currentColor"
              d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
            ></path>
          </svg>
        );
      default:
        break;
    }
  };

  const [searchKey, setSearchKey] = useState("");
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get(USER_SUGGESTIONS_URL).then((res) => {
      setUsers(res.data.data);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (searchKey !== "") {
      let result = users.filter((user) =>
        user.name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setSearchResults(result);
    } else {
      setSearchResults([]);
    }
    // eslint-disable-next-line
  }, [searchKey]);

  return (
    <nav className=" flex items-center justify-around flex-wrap bg-white border-b-1 shadow border-black">
      <div>
        <div className="flex items-center flex-shrink-0 text-white sm:mr-6 py-6 sm:pl-6">
          <A href="/home">
            <img
              className="object-scale-down sm:w-48 w-32"
              src={
                "https://user-images.githubusercontent.com/34866653/114220820-1a41f980-998a-11eb-91f5-9b14abde98d7.png"
              }
              alt="SocioMark"
            />
          </A>
        </div>
      </div>
      <div className="relative">
        <div className="flex items-center border focus:border-black">
          <input
            aria-label="search"
            name="search"
            type="text"
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            value={searchKey}
            className="appearance-none w-full text-xs text-center rounded sm:py-2 sm:px-3 py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search Users"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="mx-2 text-gray-500"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
        {searchResults.length > 0 && (
          <div className="w-full absolute border border-gray-400 bg-white mt-1 rounded-lg shadow-lg py-2 z-50">
            {searchResults?.map((result) => {
              return (
                <button
                  key={result.user_id}
                  className="w-full"
                  onClick={() => {
                    setSearchKey("");
                    navigate(`/user/${result.user_id}`);
                    window.location.reload();
                  }}
                >
                  <div className="text-gray-700 hover:bg-blue-50 hover:text-blue-800 mx-4 text-xs border-b p-1 mb-1">
                    {result.name}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="block lg:hidden py-6 sm:pr-6">
        <button
          onClick={() => setShown(!shown)}
          className="flex items-center px-3 py-2 border outline-none rounded text-black border-black  hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full ${
          shown ? "block" : "hidden"
        }  lg:flex lg:items-center lg:w-auto lg:justify-center  pb-6 lg:p-6`}
      >
        <div className="text-sm items-center float-right flex flex-col lg:flex-row">
          {links &&
            links.map((el) => (
              <A
                key={el.title}
                className="block text-base font-bold lg:inline-block lg:mt-0  hover:text-indigo-700 pr-20 lg:px-4 py-2 text-right lg:text-left hover:bg-blue-100"
                href={el.link}
              >
                {shown ? el.title : iconForTitle(el.title)}
              </A>
            ))}
          <div className="flex justify-end text-base font-bold lg:inline-block lg:mt-0  hover:text-white pr-20 lg:px-4 py-2 text-right lg:text-left lg:hover:bg-blue-300 hover:bg-blue-300">
            {logout && (
              <A
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.setItem("access_token", "");
                  navigate("/");
                  window.location.reload();
                }}
              >
                {shown ? "Logout" : iconForTitle("Logout")}
              </A>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
