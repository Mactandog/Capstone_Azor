import { useAuthContext } from "./useAuthContext";
import { useBookingsContext } from "./useBookingsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: bookingDispatch } = useBookingsContext();

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem("user");

    //dispatch logout
    dispatch({ type: "LOGOUT" });
    bookingDispatch({ type: "SET_BOOKINGS", payload: null });
  };

  return { logout };
};
