import React, { useState } from "react";
import Badge from "react-bootstrap/esm/Badge";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import ViewBookingModal from "../modals/ViewBookingModal";
import { useAuthContext } from "../hooks/useAuthContext";

const BookingsRows = ({ booking }) => {
  const { user } = useAuthContext();

  let bookdate = new Date(`${booking.date}`).toLocaleDateString();

  const [showModal, setShowModal] = useState(false);

  // const swalWithBootstrapButtons = Swal.mixin({
  //   customClass: {
  //     confirmButton: "btn btn-success me-3",
  //     cancelButton: "btn btn-danger",
  //   },
  //   buttonsStyling: false,
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!user) {
  //     setError("You must be logged in!");
  //     return;
  //   } else {
  //     swalWithBootstrapButtons
  //       .fire({
  //         title: "Are you sure?",
  //         text: "You won't be able to revert this!!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Yes, cancel it!",
  //       })
  //       .then((result) => {
  //         if (result.isConfirmed) {
  //           swalWithBootstrapButtons.fire(
  //             "Booking Cancelled!",
  //             `Booking with Ref. Num. <strong>${booking._id}</strong> has been cancelled.`,
  //             "success"
  //           );
  //           cancelBooking();
  //         }
  //       });
  //   }
  // };

  // const cancelBooking = async (e) => {
  //   if (!user) {
  //     setError("You must be logged in");
  //     return;
  //   }

  //   const status = {
  //     stats: "Cancel",
  //   };

  //   console.log(status);
  //   const response = await fetch(`/api/bookings/cancel/${booking._id}`, {
  //     method: "PATCH",
  //     body: JSON.stringify(status),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });
  //   const json = await response.json();

  //   if (!response.ok) {
  //     console.log(json.error);
  //     setError(json.error);
  //   }

  //   if (response.ok) {
  //     console.log("Booking cancelled!", json);
  //     // dispatch({ type: "UPDATE_BOOKING", payload: json });
  //     // navigate(`/account/user/${id}/bookings`);
  //   }
  // };

  return (
    <>
      <tr
        onClick={() => {
          setShowModal(true);
        }}
      >
        <td>{booking._id}</td>
        <td>
          {booking.first_name} {booking.last_name}
        </td>
        <td>{bookdate}</td>
        <td>{booking.time_slot}</td>
        <td>
          <h6>
            <Badge
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
          </h6>
        </td>

        <td className="text-center" style={{ width: "1rem" }}>
          {booking.stats === "Completed" || booking.stats === "Cancelled" ? (
            ""
          ) : (
            <Button
              as={Link}
              to={`/account/bookings/${booking._id}/complete-booking`}
              size="sm"
              className="btn-success"
            >
              <i className="fa-regular fa-square-check"></i>
            </Button>
          )}
        </td>
        <td className="text-center" style={{ width: "1rem" }}>
          {" "}
          {booking.stats === "Completed" || booking.stats === "Cancelled" ? (
            ""
          ) : (
            // <form onSubmit={handleSubmit}>
            <Button
              size="sm"
              className="btn-dark"
              disabled={booking.stats === "Completed" ? true : false}
              // type="submit"
            >
              <i className="fa-solid fa-xmark"></i>
            </Button>
          )}
        </td>
      </tr>

      <ViewBookingModal
        showModal={showModal}
        setShowModal={setShowModal}
        booking={booking}
        bookdate={bookdate}
      />
    </>
  );
};

export default BookingsRows;
