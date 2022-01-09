import React, { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN_GOOGLE":
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

const AuthProvider = ({ children, setLogin }) => {
  const [state, dispatch] = useReducer(reducer, { user: null });
  const value = { state, dispatch };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const tokenID = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_GOOGLE",
          payload: { email: user.email, token: tokenID.token, uid: user.uid },
        });

        setLogin(true);
      } else {
        dispatch({
          type: "LOGGED_IN_GOOGLE",
          payload: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
