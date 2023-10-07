import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useBookingsContext } from "../../hooks/useBookingsContext";
import Swal from "sweetalert2";
import ViewBookingModal from "../../modals/ViewBookingModal";
import { useAuthContext } from "../../hooks/useAuthContext";


const BookingCard = ({ booking, editBooking }) => {
  const { user } = useAuthContext();

  //View Booking Modal
  const [showModal, setShowModal] = useState(false);
  let bookdate = new Date(booking.date).toDateString();
  let dateCreated = new Date(booking.createdAt).toDateString();

  const { dispatch } = useBookingsContext();

  const deleteBooking = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`${process.env.HOST}/api/bookings/${booking._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
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
            "Your appointment record is safe!",
            "error"
          );
        }
      });
  };

  return (
    <>
      <Card
        className="border border-dark bg-white my-4"
        style={{ borderRadius: "5px" }}
      >
        <Row style={{ padding: "1.5rem" }}>
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

              <br></br>
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

        <Card.Body className="py-0 my-4 " style={{ padding: "2.5rem" }}>
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
                  {booking.mechanic_notes
                    ? booking.mechanic_notes
                    : "No other notes from the mechanic in-charge"}
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
          {booking.stats === "Pending" ? (
            <Button
              as={NavLink}
              to={`/account/bookings/update/${booking._id}`}
              variant="outline-info"
              size="sm"
              onClick={editBooking}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
          ) : (
            ""
          )}{" "}
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>
            <i className="fa-solid fa-trash-can"></i>
          </Button>
        </Card.Body>
        <Card.Footer className="d-flex flex-column">
          <span
            className="ms-auto mb-0"
            style={{ fontSize: ".75rem", fontStyle: "italic" }}
          >
            {dateCreated}
            {/* {formatDistance(
              subDays(new Date(booking.createdAt), 0),
              new Date(),
              {
                addSuffix: true,
              }
            )} */}
          </span>
          <span
            className="ms-auto mt-0 text-muted"
            style={{ fontSize: ".70rem", fontStyle: "italic" }}
          >
            Date Created
          </span>
        </Card.Footer>
      </Card>

      <ViewBookingModal
        showModal={showModal}
        setShowModal={setShowModal}
        booking={booking}
        bookdate={bookdate}
        user={user}
      />
    </>
  );
};

export default BookingCard;
