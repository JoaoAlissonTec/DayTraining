import { useContext, createContext, useEffect, useState } from "react";
import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { loginUser } from "../services/firebaseAuth";

const AuthContext = createContext();

export function useSession() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }) {

  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setIsLoading(false)
    })

    return () => unsubscribe();
  }, [auth])

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, password) => {
          const response = await loginUser(email, password)
          console.log(response, email, password)
          if(response.status === 200){
            return true
          }else{
            return false
          }
        },
        signOut: async () => {
          await signOut(auth)
        },
        session: user,
        isLoading
      }}
    >
        {children}
    </AuthContext.Provider>
  );
}
