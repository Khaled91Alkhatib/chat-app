import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

import "../styles/Chats.scss";
import axios from 'axios';

const Chats = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // console.log("khaled", user)

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  /* For users to have an image */
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob(); /* blobs are any type of files that you want to transfer over in binary format */
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return; /* So that we don't continue with the code if there is no user */
    }

    /* Getting the already created user */
    axios.get("https://api.chatengine.io/users/me", {
      headers: {
        "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
        "user-name": user.email,
        "user-secret": user.uid
      }
    })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL)
          .then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            /* We need to create a user if it doesn't exist */
            axios.post("https://api.chatengine.io/users", formdata, { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY } })
              .then(() => {
                setLoading(false);
              })
              .catch((error) => {
                console.log("error", error);
              });
          });
      });
  }, [user, navigate]);

  if(!user || loading){
    return "Loading ..."
  }
  return (
    <div>
      <div className='navbar'>
        <div>
          Worldnect
        </div>
        <button onClick={handleLogout}>
          logout
        </button>
      </div>
      <ChatEngine
        // height= "calc(100vh -66px"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;