import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

/* Create the context */
const AuthContext = React.createContext();

/* Create function that we can use to grab the context we created above */
export const useAuth = () => useContext(AuthContext);

/* To manage the users' data */
/* Most likely whenever we use authProvider,
we'll use 'children' to render all the jsx that we pass into the authProvider */
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  /* Since we cant assign useNavigate in a callback function, we assign it here and call it inside the useEffect */
  const navigate = useNavigate();

  /* We need to call something coming from firebaseAuth */
  /* The call back function in auth.onAuthStateChanged(user) gives us the users' data.
  In other words, we are grabbing the user from the firebase authentication */
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        navigate("/chats");
      }
    });
  }, [user, navigate]);

  /* Whenever we are working with auth context, we need to have one value object */
  const value = { user };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 