import { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/esm/Badge";
import Button from "react-bootstrap/esm/Button";
import { Link, useParams } from "react-router-dom";
import ViewBookingModal from "../../modals/ViewBookingModal";

function ActivityCard({ booking }) {
  const { id } = useParams();
  let bookdate = new Date(booking.date).toDateString();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card bg="light" text="dark" className=" mb-3 border-dark">
        <Card.Header className="d-flex">
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
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-primary">
            {booking.brand} {booking.model}
          </Card.Title>
          <Card.Text className="d-flex flex-column">
            <small>Appointment Date: </small>
            <span>
              <b>
                {bookdate} - {booking.time_slot}
              </b>
            </span>
          </Card.Text>
          <Button
            size="sm"
            className="me-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            View
          </Button>
          {booking.stats === "Pending" ? (
            <Button
              size="sm"
              variant="outline-info"
              as={Link}
              to={`/account/bookings/update/${booking._id}`}
            >
              Edit
            </Button>
          ) : (
            ""
          )}
        </Card.Body>
        <Card.Footer>
          <small>
            Ref. Num. <b>{booking._id}</b>
          </small>
        </Card.Footer>
      </Card>
      <ViewBookingModal
        showModal={showModal}
        setShowModal={setShowModal}
        booking={booking}
        bookdate={bookdate}
      />
    </>
  );
}

export default ActivityCard;
