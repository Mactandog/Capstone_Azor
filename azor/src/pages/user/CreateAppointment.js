import React from "react";
import Container from "react-bootstrap/esm/Container";
import UserBookServiceForm from "../../components/forms/UserBookServiceForm";

const CreateAppointment = () => {
  return (
    <div>
      <Container className="mt-3 border-bottom border-secondary">
        <h1 className="text-primary">
          <i className="fa-regular fa-calendar-plus me-3"></i>Create New
          Appointment
        </h1>
        <div className="fs-3 mb-2">
          To start your <span className="text-primary">booking</span>, please
          provide all the required information.
        </div>
      </Container>
      <Container className="my-4">
        <UserBookServiceForm />
      </Container>
    </div>
  );
};

export default CreateAppointment;
