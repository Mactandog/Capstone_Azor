import React from "react";
import Container from "react-bootstrap/esm/Container";
import EditBookingForm from "../../components/forms/EditBookingForm";

const UserEditBooking = () => {
  return (
    <div>
      <Container className="mt-3 border-bottom border-secondary">
        <h1 className="text-primary">
          <i className="fa-solid fa-pen-to-square me-3"></i>Edit Appointment
        </h1>
        <div className="fs-3 mb-2">
          To update your <span className="text-primary">booking</span>, please
          provide all the required information.
        </div>
      </Container>
      <Container className="my-5">
        <EditBookingForm />
      </Container>
    </div>
  );
};

export default UserEditBooking;
