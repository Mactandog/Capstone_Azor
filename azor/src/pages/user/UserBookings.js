import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import BookingCard from "../../components/cards/users/BookingCard";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { useBookingsContext } from "../../components/hooks/useBookingsContext";
import UserBookingPagination from "../../components/paginations/UserBookingPagination";
import Spinner from "react-bootstrap/Spinner";
import AddBookingBtn from "../../components/buttons/AddBookingBtn";
import { useAuthContext } from "../../components/hooks/useAuthContext";

const UserBookings = () => {
  const { user } = useAuthContext();
  const { bookings, dispatch } = useBookingsContext();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  // const [lastPage, setLastPage] = useState(null);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  // const currentPosts = bookings.slice(firstPostIndex, lastPostIndex);
  // console.log(currentPosts);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch("/api/bookings", {
        headers: { Authorization: `Bearer ${user.token}` },
      }); // fetch data from the server
      const json = await response.json(); // pass to a variable to use the data

      // check if response is ok
      if (response.ok) {
        dispatch({ type: "SET_BOOKINGS", payload: json });
        setLoading(false);
      }
    };
    if (user) {
      fetchBookings();
    }
  }, [dispatch, user]);

  const viewBooking = () => {};
  const editBooking = () => {};

  const countBooking = () => {};

  //
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setData(data);
    }
  }, []);
  const id = data._id;

  const [searchTerm, setsearchTerm] = useState("");
  const [selectValue, setValue] = useState(""); // selected value in filter

  const handleSelect = (e) => {
    console.log(e, id);
    setValue(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsearchTerm("");
  };

  //
  return (
    <>
      <Container className="mt-3 border-bottom border-secondary">
        {/* <Row className="mb-3">
          <Col sm={12} lg={8}>
            <h1>My Appointments</h1>
          </Col>
          <Col lg={4}>
            <AddBookingBtn />
          </Col>
        </Row> */}
        <div className="mb-3 d-flex flex-wrap">
          <h1>My Appointments</h1>

          <div className="ms-auto">
            <AddBookingBtn />
          </div>
        </div>
      </Container>

      <Container className="my-3">
        {/*  */}
        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Text input with dropdown button"
              placeholder="Search"
              onChange={(event) => {
                setsearchTerm(event.target.value);
                console.log(searchTerm);
              }}
            />

            <DropdownButton
              variant="secondary"
              title="Filter by"
              id="input-group-dropdown-2"
              align="end"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="brand">Brand</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="stats">Status</Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </form>
        {/*  */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner
              animation="border"
              variant="primary"
              size="lg"
              className="mt-5"
            />
          </div>
        ) : (
          <>
            <Row>
              <Col sm={12}>
                <span>Total {countBooking()} bookings</span>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="flex-column">
                  {bookings
                    .filter((val) => {
                      if (searchTerm == "") {
                        return val;
                      } else if (
                        val.stats
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((booking) => (
                      <BookingCard
                        key={booking._id}
                        booking={booking}
                        viewBooking={viewBooking}
                        editBooking={editBooking}
                      />
                    ))}
                </div>
              </Col>
            </Row>

            <Container className="d-flex justify-content-center">
              <UserBookingPagination />
            </Container>
          </>
        )}
      </Container>
    </>
  );
};

export default UserBookings;
