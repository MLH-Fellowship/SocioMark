import React,{useState,useContext} from "react";
import CreateComment from "./CreateComment";

export default function Post({post}) {

  return (
    <div>
      <div className="max-w-3xl mx-auto justify-center">
        <div className="rounded-lg bg-white shadow border p-4 mt-4 ">
          <div className="flex w-full items-center">
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
              className="rounded-full my-2 h-10 w-10 shadow"
            />
            <h3 className="text-xl  font-bold px-2 py-4"> {post.author_name}</h3>
          </div>
          <div className="mx-auto">
            <img
              src={post.image}
              className="relative w-full object-contain h-std rounded-lg shadow-lg"
            />
          </div>
          <div className="text-md font-normal mt-1">
              <span className="font-semibold">@{post.author_name}: </span>
              {post.description}
          </div>
         {post.comments.map((comment)=>{
             return(<div className="text-md font-normal mt-1 border-t border-gray-200">
             <span className="font-semibold">{comment.name}: </span>
             {comment.payload}
         </div>)
         })}
         <CreateComment post={post}/>
        </div>
      </div>
    </div>
  );
}