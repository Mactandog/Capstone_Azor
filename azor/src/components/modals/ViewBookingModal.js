import React, { useState } from "react";
import Badge from "react-bootstrap/esm/Badge";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { useBookingsContext } from "../hooks/useBookingsContext";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useAuthContext } from "../../components/hooks/useAuthContext";

const ViewBookingModal = ({ showModal, setShowModal, booking, bookdate }) => {
  const { user } = useAuthContext();
  const { dispatch } = useBookingsContext();
  const [error, setError] = useState(null);
  const stats = "Cancelled";
  const { id } = useParams();

  console.log(user);

  const cancelBooking = async (e) => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const status = {
      stats: stats,
    };
    console.log(status);
    const response = await fetch(`${process.env.API ?? ""}/api/bookings/cancel/${booking._id}`, {
      method: "PATCH",
      body: JSON.stringify(status),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setError(json.error);
    }

    if (response.ok) {
      console.log("Booking cancelled!", json);
      dispatch({ type: "UPDATE_BOOKING", payload: json });
      // navigate(`/account/user/${id}/bookings`);
    }
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleCancel = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Please note that you will never revert it back when you cancel an appointment!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel this appointment!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Cancelled!",
            `Your appointment with Ref. Num. <strong>${booking._id}</strong> has been <span className="text-primary">Cancelled</span>!`,
            "success"
          );
          cancelBooking();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
  };

  return (
    <>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="booking details"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="bookingDetails"
            className="text-primary"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "1",
              overflow: "hidden",
            }}
          >
            {booking.brand} - {booking.model}
          </Modal.Title>
          <Badge
            pill
            bg={
              booking.stats === "Completed"
                ? "success"
                : booking.stats === "Pending"
                ? "warning"
                : "danger"
            }
            className="mx-3"
          >
            {booking.stats}
          </Badge>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="border-bottom border-danger">
            <span className="text-muted">Reference Number:</span>
            <br></br>
            <b>{booking._id}</b>

            <Row className="mt-3">
              <Col sm={12} md={3}>
                <span>Appointment Date:</span>
              </Col>
              <Col sm={12} md={6}>
                <span className="fw-semibold">{bookdate}</span>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={12} md={3}>
                <span>Time Slot:</span>
              </Col>
              <Col sm={12} md={6}>
                <span className="fw-semibold">{booking.time_slot}</span>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={12}>
                <span>
                  <b>My Notes:</b>
                </span>
              </Col>
              <Col sm={12}>
                {/* <div className="border border-dark p-2"> */}
                <div className="p-2">
                  <span
                    style={{
                      fontSize: ".85rem",
                    }}
                  >
                    {booking.remarks}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Row className="mt-2">
              <h6 className="mt-2">Service details</h6>
              <Col sm={12} md={12}>
                <h5>
                  <span
                    className="fw-bold"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: "1",
                      overflow: "hidden",
                    }}
                  >
                    {`${booking.services}`}
                  </span>
                </h5>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={12} className="mb-3">
                <span>Estimated Cost: </span>
                <b>Php {booking.costs}</b>
              </Col>
              <Col sm={12}>
                <span>Mechanic Notes:</span>
              </Col>
              <Col sm={12}>
                <span
                  className="text-muted"
                  style={{
                    fontSize: ".85rem",
                  }}
                >
                  {booking.mechanic_notes
                    ? booking.mechanic_notes
                    : "No other notes or recommendations from the mechanic in-charge."}
                </span>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        {booking.stats === "Pending" ? (
          <Modal.Footer>
            <form onSubmit={cancelBooking}>
              <Button variant="outline-dark" onClick={handleCancel}>
                <i className="fa-regular fa-calendar-xmark me-1"></i> Cancel
                Booking
              </Button>
            </form>
          </Modal.Footer>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
};

export default ViewBookingModal;
