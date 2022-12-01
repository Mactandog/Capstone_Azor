import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, useParams } from "react-router-dom";

const AddBookingBtn = () => {
  const { id } = useParams();
  return (
    <>
      <Button as={Link} to={`/account/create-appointment`} size="lg">
        <i className="fa-solid fa-calendar-plus"></i> Book an appointment
      </Button>
    </>
  );
};

export default AddBookingBtn;
