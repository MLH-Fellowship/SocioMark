import React, { useState } from "react";
import { navigate } from "hookrouter";

export default function UserProfile() {
  return (
    <div className="flex flex-col sm:flex-row mx-auto bg-white h-auto text-xl justify-center">
        <div className="flex md:flex-col flex-wrap w-full sm:w-1/2 items-center pt-24 ">
          <div className="flex flex-col md:w-1/2 items-center mx-auto">
            <div className=" items-center">
              <img
                className="h-40 w-40 border-black border-2 rounded-full"
                src="https://www.thoughtco.com/thmb/rC2X0mQgPVCOmDclXeUtN16MiOA=/2250x1500/filters:fill(auto,1)/spongebob_wide-56a00f0a5f9b58eba4aeb6f2.jpg"
                alt
              />
            </div>
          </div>

          <div className="flex flex-col w-full md:w-4/5 mx-auto py-2 text-center items-center">
            <div className="text-left pl-4 pt-3 text-center w-2/3">
              <span className="text-base text-gray-700 text-3xl">
                Deepak Agrawal
              </span>
            </div>

            <div className="text-left pl-4 text-center w-1/2">
              <span className="text-lg font-bold text-gray-700 mr-2 ">
                debugagrawal
              </span>
            </div>

            <div className="text-left pl-4 pt-3 text-center w-4/5">
              <p className="text-base font-medium text-black-700 mr-2 box-content text-xl font-mono ">
                Hey there, I'm a photographer and like to click pictures you can
                see my work in the posts below and comment what you feel about
                them
              </p>
            </div>
          </div>

          <div className="text-left text-center w-1/2 mx-auto">
            <button className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-6 border border-gray-600 hover:border-transparent rounded">
              Edit Profile
            </button>
          </div>
        </div>

      <div className="flex flex-col sm:2/3 w-full pt-24 items-start">
        <div className="flex-1 text-center px-4 py-2 m-2">
          <img
            className="sm:w-3/4 w-full"
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
        <div className="flex-1 text-center px-4 py-2 m-2 ">
          <img
            className="sm:w-3/4 w-full "
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
        <div className="flex-1 text-center px-4 py-2 m-2 ">
          <img
            className="sm:w-3/4 w-full"
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
      </div>
    </div>
  );
}
