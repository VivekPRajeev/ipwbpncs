import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../db/schemas";

type CurrentUser = Pick<User, "id" | "name">;

interface UserContextType {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for easy access
export const useCurrentUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
