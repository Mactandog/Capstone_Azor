import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useBookingsContext } from "../components/hooks/useBookingsContext";

const DummyBookingDetails = ({ booking }) => {
  const { dispatch } = useBookingsContext();

  const handleClick = async () => {
    const response = await fetch(`${process.env.API ?? ""}/bookings/` + booking._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BOOKING", payload: json });
    }
  };

  return (
    <>
      <div
        className="card"
        style={{ width: "18rem", height: "20rem", margin: "1rem" }}
      >
        <div className="card-body">
          <h5 className="card-title">{booking.first_name}</h5>
          <p className="card-text">Date: {booking.date}</p>
          <p className="card-text">Time Slot: {booking.time_slot}</p>
          <p className="card-text">Date booked: {booking.createdAt}</p>
          <Button onClick={handleClick} className="btn btn-primary">
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default DummyBookingDetails;
