import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import { NavLink, useParams } from "react-router-dom";
import { formatDistance, subDays } from "date-fns";
import { useBookingsContext } from "../../hooks/useBookingsContext";
import Swal from "sweetalert2";
import ViewBookingModal from "../../modals/ViewBookingModal";

const BookingCard = ({ booking, editBooking }) => {
  //View Booking Modal
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  let bookdate = new Date(booking.date).toDateString();

  const { dispatch } = useBookingsContext();

  const deleteBooking = async () => {
    const response = await fetch(`/api/bookings/${booking._id}`, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BOOKING", payload: json });
    }
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger me-3",
    },
    buttonsStyling: false,
  });

  const handleDelete = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            `Your appointment with Ref. Num. <strong>${booking._id}</strong> has been deleted.`,
            "success"
          );
          deleteBooking();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Appointment is not deleted",
            "error"
          );
        }
      });
  };
  return (
    <>
      <Card
        className="border border-dark bg-white my-4"
        style={{ borderRadius: "5px", padding: "1.5rem" }}
      >
        <Row>
          <Col sm={12} md={10}>
            <Card.Title className="px-3 mb-0">
              <h5
                className="fw-semibold text-primary mb-0 fs-3"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "1",
                  overflow: "hidden",
                }}
              >
                {booking.brand} - {booking.model}
              </h5>
              <small className="text-muted">Reference Number:</small>
              <br></br>
              <small>
                <b>{booking._id}</b>
              </small>
            </Card.Title>
          </Col>
          <Col xs={{ order: 1 }} sm={12} md={2}>
            <div className="d-flex px-3 ">
              <h5>
                <Badge
                  pill
                  bg={
                    booking.stats === "Completed"
                      ? "success"
                      : booking.stats === "Pending"
                      ? "warning"
                      : "danger"
                  }
                  className="ms-auto"
                >
                  {booking.stats}
                </Badge>
              </h5>
            </div>
          </Col>
        </Row>

        <Card.Body className="py-0 mt-4">
          <div className="border-bottom border-danger">
            <Row>
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
          </div>
          <h6 className="mt-3">My Notes:</h6>
          {booking.remarks}
          <div
            className="p-2 mt-4"
            style={{ borderStyle: "dashed", borderWidth: "1px" }}
          >
            <h6 className="mt-2">Service details</h6>
            <Row className="mt-2">
              <Col sm={12} md={12}>
                <h5>
                  {/* <Badge bg="info" text="dark"> */}
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
                  {/* </Badge> */}
                </h5>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={12}>
                <span>Mechanic Notes:</span>
              </Col>
              <Col sm={12}>
                <span
                  className="text-muted"
                  style={{
                    fontSize: ".85rem",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: "2",
                    overflow: "hidden",
                  }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
                  ex exercitationem molestiae maiores laboriosam, at nemo, neque
                  numquam dolor voluptatibus earum vel nobis cumque dolore
                  perferendis voluptatum! Architecto, molestiae repellat?
                </span>
              </Col>
            </Row>
          </div>
          <br></br>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setShowModal(true);
            }}
          >
            More details
          </Button>{" "}
          <Button
            as={NavLink}
            to={`/account/user/${id}/bookings/update/${booking._id}`}
            variant="outline-info"
            size="sm"
            onClick={editBooking}
          >
            Edit
          </Button>{" "}
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </Card.Body>
        <span
          className="ms-auto mb-0"
          style={{ fontSize: ".75rem", fontStyle: "italic" }}
        >
          {formatDistance(subDays(new Date(booking.updatedAt), 0), new Date(), {
            addSuffix: true,
          })}
        </span>
        <span
          className="ms-auto mt-0 text-muted"
          style={{ fontSize: ".70rem", fontStyle: "italic" }}
        >
          Last updated
        </span>
      </Card>

      <ViewBookingModal
        showModal={showModal}
        setShowModal={setShowModal}
        booking={booking}
        bookdate={bookdate}
      />
    </>
  );
};

export default BookingCard;
