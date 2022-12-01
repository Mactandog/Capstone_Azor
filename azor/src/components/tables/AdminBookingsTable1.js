import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/esm/Badge";
import Table from "react-bootstrap/Table";
import { useBookingsContext } from "../hooks/useBookingsContext";
import BookingsRows from "./BookingsRows";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminBookingsTable = () => {
  const { user } = useAuthContext();
  const { bookings, dispatch } = useBookingsContext();
  console.log(bookings);
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
    if (user) {
      fetchBookings();
    }
  }, [dispatch, user]);

  return (
    <div className="">
      <Table hover responsive variant="light">
        <thead>
          <tr>
            <th>Reference Number</th>
            <th>Name</th>
            <th>Date Created</th>
            <th>Time Slot</th>
            <th>Status</th>
            <th>Complete</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.map((booking) => (
              <BookingsRows key={booking._id} booking={booking} />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminBookingsTable;
