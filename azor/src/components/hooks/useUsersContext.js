import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export const useUsersContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUsersContext must be used inside a UserContextProvider");
  }
  return context;
};
