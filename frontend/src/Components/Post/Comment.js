import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { A } from "hookrouter";

export default function Comment({ handleDeleteComment, comment }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-md flex justify-between font-normal mt-1 px-2 py-1 border-t border-gray-200">
      <div className="text-justify">
        <A href={`/user/${comment.user_id}`}>
          <span className="font-semibold">{comment.name}: </span>
        </A>

        <span>{comment.payload}</span>
      </div>
      {user[0].user_id === comment.user_id && (
        <A href="#" onClick={() => handleDeleteComment(comment.comment_id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="red"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </A>
      )}
    </div>
  );
}
