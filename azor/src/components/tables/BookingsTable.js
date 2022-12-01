import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBookingsContext } from "../hooks/useBookingsContext";

const BookingsTable = () => {
  const { bookings, dispatch } = useBookingsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch("/api/bookings/admin", {
        headers: { Authorization: `Bearer ${user.token}` },
      }); // fetch data from the server
      const json = await response.json(); // pass to a variable to use the data

      // check if response is ok
      if (response.ok) {
        dispatch({ type: "SET_BOOKINGS", payload: json });
      }
    };
    fetchBookings();
  }, [dispatch]);

  console.log(bookings);
  return (
    <div className="m-5 ">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Booking Id</th>
            <th>First Name</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Date created</th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking._id}</td>
                <td>{booking.first_name}</td>
                <td>{booking.date}</td>
                <td>{booking.time_slot}</td>
                <td>{booking.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookingsTable;
