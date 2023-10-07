import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import BookServiceForm from "../components/forms/BookServiceForm";
import { useBookingsContext } from "../components/hooks/useBookingsContext";
import DummyBookingDetails from "./DummyBookingDetails";

const DummyPage = () => {
  const { bookings, dispatch } = useBookingsContext();

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(`${process.env.API ?? ""}/api/bookings`); // fetch data from the server
      const json = await response.json(); // pass to a variable to use the data

      // check if response is ok
      if (response.ok) {
        dispatch({ type: "SET_BOOKINGS", payload: json });
      }
    };
    fetchBookings();
  }, [dispatch]);

  return (
    <>
      <Container>
        <BookServiceForm />
      </Container>
      <div className="d-flex flex-row  justify-content-center bg-light py-5 px-3">
        <div className="d-flex justify-content-center flex-wrap ">
          {bookings &&
            bookings.map((booking) => (
              <DummyBookingDetails key={booking._id} booking={booking} />
            ))}
        </div>
      </div>
    </>
  );
};

export default DummyPage;
