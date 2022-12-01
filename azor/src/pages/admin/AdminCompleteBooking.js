import React from "react";
import Container from "react-bootstrap/esm/Container";
import AdminCompleteForm from "../../components/forms/AdminCompleteForm";

const AdminCompleteBooking = () => {
  return (
    <>
      <Container className="mt-3 border-bottom border-secondary ">
        <h1>Booking Details</h1>
      </Container>
      <Container className="mb-5">
        <AdminCompleteForm />
      </Container>
    </>
  );
};

export default AdminCompleteBooking;
