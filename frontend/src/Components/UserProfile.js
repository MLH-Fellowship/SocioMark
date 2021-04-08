import React, { useState,useEffect } from "react";
import axios from "axios"
import { GET_USER_DETAILS } from "../constants";
import { Loading } from "../Components/Common/Loader";


export default function UserProfile({ id }) {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios
      .get(GET_USER_DETAILS+`${id}`)
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
          console.log("User Not found"); //catch error in backend and update here
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(user);

  return (
    <div>
     {loading?<Loading/>: <div> 
        <div className="text-2xl font-bold">
          Hey {user.name}
        </div>
      </div>}
    </div>
  );
}
