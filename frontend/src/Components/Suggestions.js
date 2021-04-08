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
            />
          </A>
          <A href={`/user/${user.user_id}`}>
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
          </A>
          <div className="flex gap-x-1 items-center bg-green-50 text-green-700 p-.5 px-1 font-semibold text-xs">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                fill="currentColor"
                class="bi bi-image-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
              </svg>
            </span>
            5 Posts
          </div>
        </div>
        <div className="flex-shrink-0">
          <button className="inline-flex items-center px-3 py-0.5 rounded-full bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="-ml-1 mr-0.5 h-5 w-5 text-blue-400"
              viewBox="0 0 16 16"
            >
              <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z" />
            </svg>
            Visit
          </button>
        </div>
      </div>
    </div>
  );
}
