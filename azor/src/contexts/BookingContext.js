import { createContext, useReducer } from "react";

export const BookingContext = createContext();

export const bookingReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKINGS":
      return {
        bookings: action.payload,
      };

    case "CREATE_BOOKING":
      return {
        bookings: [action.payload, state.bookings],
      };
    case "DELETE_BOOKING":
      return {
        bookings: state.bookings.filter(
          (booking) => booking._id !== action.payload._id
        ),
      };
    case "UPDATE_BOOKING":
      const newBooking = state.bookings.filter(
        (booking) => booking._id !== action.payload._id
      );

      return {
        bookings: newBooking,
      };
    default:
      return state;
  }
};

export const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, { bookings: null });

  return (
    <BookingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};
