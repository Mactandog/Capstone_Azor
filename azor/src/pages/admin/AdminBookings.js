import React from "react";
import Container from "react-bootstrap/esm/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import AdminBookingsTable from "../../components/tables/AdminBookingsTable";

const AdminBookings = () => {
  return (
    <>
      <Container className="mt-3 border-bottom border-secondary ">
        <h1>
          <i className="fa-solid fa-calendar-check text-primary"></i> Bookings
        </h1>
      </Container>
      <Container className="my-5">
        <AdminBookingsTable />
      </Container>
    </>
  );
};

export default AdminBookings;
