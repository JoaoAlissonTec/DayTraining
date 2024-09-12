import { useContext, createContext } from "react";
import React from "react";
import { useStorageState } from "../storage/useStorageState";

const AuthContext = createContext({signIn: ()=>null, signOut: ()=>null, session: null, isLoading: false});

export function useSession() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          setSession("mykey");
          return true
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading
      }}
    >
        {children}
    </AuthContext.Provider>
  );
}
