import React from "react";
import { A } from "hookrouter";

export default function Suggestions({ user }) {
  return (
    <div className="sticky top-0 mt-4 px-2 ">
      <div className="flex justify-between">
        <div className="flex gap-x-1 sm:gap-x-2 items-center">
          <A href={`/user/${user.user_id}`}>
            <img
              className="rounded-full h-8 w-8 shadow"
              src={user.profile_picture}
              alt="Profile_Picture"
            />
          </A>
          <A href={`/user/${user.user_id}`}>
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
          </A>
        </div>
        <div className="flex-shrink-0">
          <A
            href={`/user/${user.user_id}`}
            className="inline-flex items-center px-3 py-0.5 rounded-full bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="-ml-1 mr-0.5 h-5 w-5 text-blue-400"
              viewBox="0 0 16 16"
            >
              <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z" />
            </svg>
            Visit
          </A>
        </div>
      </div>
    </div>
  );
}
