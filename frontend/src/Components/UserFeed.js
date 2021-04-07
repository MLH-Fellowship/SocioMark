import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CreatePost from "./Post/CreatePost";
import { AuthContext } from "../Context/AuthContext";


export default function UserFeed() {
  const {  value2 } = useContext(AuthContext);
  const [access] = value2;

  return (
    <div>
      <div className="max-w-5xl mx-auto p-2">
        <CreatePost />
      </div>
    </div>
  );
}