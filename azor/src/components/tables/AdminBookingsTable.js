import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/esm/Badge";
import Table from "react-bootstrap/Table";
import { useBookingsContext } from "../hooks/useBookingsContext";
import BookingsRows from "./BookingsRows";
import { useAuthContext } from "../hooks/useAuthContext";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const AdminBookingsTable = () => {
  const { user } = useAuthContext();
  const { bookings, dispatch } = useBookingsContext();
  console.log(bookings);
  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(`${process.env.API ?? ""}/api/bookings/admin1`, {
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
  //
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setData(data);
    }
  }, []);

  const [searchTerm, setsearchTerm] = useState("");
  const [value, setValue] = useState(""); // selected value in filter

  const handleSelect = (e) => {
    setValue(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsearchTerm("");
  };

  //

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Text input with dropdown button"
            placeholder="Search"
            onChange={(event) => {
              setsearchTerm(event.target.value);
              console.log(searchTerm);
            }}
          />

          <DropdownButton
            variant="secondary"
            title="Filter by"
            id="input-group-dropdown-2"
            align="end"
            onSelect={handleSelect}
          >
            <Dropdown.Item eventKey="brand">Brand</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="stats">Status</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </form>
      {/*  */}
      <div className="">
        <Table hover responsive variant="light">
          <thead>
            <tr>
              <th>Reference Number</th>
              <th>First Name</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Status</th>
              <th>Complete</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings
                .filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (
                    val.stats.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((booking) => (
                  <BookingsRows key={booking._id} booking={booking} />
                ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AdminBookingsTable;
