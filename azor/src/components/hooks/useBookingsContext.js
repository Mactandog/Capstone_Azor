import { BookingContext } from "../../contexts/BookingContext";
import { useContext } from "react";

export const useBookingsContext = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw Error(
      "useBookingsContext must be used inside a BookingContextProvider"
    );
  }
  return context;
};
