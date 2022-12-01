import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Alert from "react-bootstrap/esm/Alert";
import { useBookingsContext } from "../hooks/useBookingsContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "../hooks/useAuthContext";
import Services from "./Services";

const UserBookServiceForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useBookingsContext();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time_slot, setTimeSlot] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [reg_num, setRegNum] = useState("");
  const [services, setServices] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [user_phone, setUser_phone] = useState(user.phone);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [costs, setTotalCost] = useState(0);
  const first_name = user.fname;
  const last_name = user.lname;
  const mechanic_notes = "";

  // SELECTED SERVICES
  // const handleSelect = (e) => {
  //   const checked = e.target.checked;
  //   const value = e.target.value;
  //   setServices(
  //     checked ? [...services, value] : services.filter((item) => item !== value)
  //   );
  // };

  // SELECTED SERVICES
  const handleChange = (item, e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setServices(
      checked ? [...services, value] : services.filter((item) => item !== value)
    );
    setTotalCost(
      checked
        ? (total) => total + parseInt(item.price)
        : (total) => total - parseInt(item.price)
    );
    console.log(setTotalCost);
  };

  console.log(services);
  // console.log(services);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in!");
      return;
    }
    console.log(emptyFields);
    if (!date) {
      setError("Date is required");
    } else if (!time_slot) {
      setError("Time Slot is required");
    } else if (!user_phone) {
      setError("Phone is required");
    } else if (!brand) {
      setError("Brand is required");
    } else if (!model) {
      setError("Model is required");
    } else if (!reg_num) {
      setError("Registration Number is required");
    } else if (services.length === 0) {
      emptyFields.push("services");
      setError("Please choose a service");
    } else {
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "Make sure to review the appointment details before submitting!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, submit booking!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              "Appointment created!",
              `You're now booked.`,
              "success"
            );
            CreateBooking();
          }
        });
    }
    // }
  };

  const CreateBooking = async () => {
    const booking = {
      date,
      time_slot,
      brand,
      model,
      reg_num,
      services,
      remarks,
      costs,
      user_phone,
      mechanic_notes,
      first_name,
      last_name,
    };
    console.log(booking);

    const response = await fetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify(booking),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setDate("");
      setTimeSlot("");
      setUser_phone("");
      setBrand("");
      setModel("");
      setRegNum("");
      setServices([]);
      setRemarks("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_BOOKING", payload: json });
      navigate(`/account/bookings`);
      console.log("New booking added", json);
      // console.log(json);
    }
  };

  // const serviceList = [
  //   { id: 1, service_name: "Brakes" },
  //   { id: 2, service_name: "Change Oil" },
  //   { id: 3, service_name: "Tires & Batteries" },
  //   { id: 4, service_name: "Maintenance" },
  //   { id: 5, service_name: "MOT" },
  // ];

  const serviceList = [
    { id: 1, service_name: "Brakes", price: 500 },
    { id: 2, service_name: "Change Oil", price: 1500 },
    { id: 3, service_name: "Tires & Batteries", price: 300 },
    { id: 4, service_name: "Maintenance", price: 3000 },
    { id: 5, service_name: "MOT", price: 1500 },
  ];

  return (
    <>
      {/* BOOKING FORM */}
      <Form onSubmit={handleSubmit}>
        <small>Name: </small>
        <h4 className="text-primary">
          {user.fname} {user.lname}
        </h4>
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="mb-3 mt-3">
          <Form.Group
            as={Col}
            md={6}
            lg={6}
            xl={6}
            controlId="date"
            className="mb-3 "
          >
            <Form.Label className="fs-5">Date*</Form.Label>
            <Form.Control
              type="date"
              name="date"
              placeholder="Date"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className={emptyFields.includes("date") ? "error" : ""}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md={6}
            lg={6}
            xl={6}
            controlId="timeSlot"
            className="mb-3"
          >
            <Form.Label className="fs-5">Prefer Time Slot*</Form.Label>
            <Form.Select
              id="time_slot"
              // name="time_slot"
              onChange={(e) => setTimeSlot(e.target.value)}
              value={time_slot}
              className={emptyFields.includes("timeSlot") ? "error" : ""}
            >
              <option disabled value="">
                Select Time Slot
              </option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3 ">
          <Form.Group
            as={Col}
            md={6}
            lg={6}
            xl={6}
            controlId="date"
            className="mb-3 "
          >
            <Form.Label className="fs-5">Phone*</Form.Label>
            <Form.Control
              type="text"
              name="user_phone"
              placeholder="Phone"
              onChange={(e) => setUser_phone(e.target.value)}
              value={user_phone}
              className={emptyFields.includes("user_phone") ? "error" : ""}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            md={4}
            lg={4}
            xl={4}
            controlId="brand"
            className="mb-3"
          >
            <Form.Label className="fs-5">Brand*</Form.Label>
            <Form.Select
              id="brand"
              name="brand"
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              className={emptyFields.includes("brand") ? "error" : ""}
            >
              <option disabled value="">
                Select Brand
              </option>
              <option value="Honda">Honda</option>
              <option value="Kawasaki">Kawasaki</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Yamaha">Yamaha</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            as={Col}
            md={4}
            lg={4}
            xl={4}
            controlId="model"
            className="mb-3"
          >
            <Form.Label className="fs-5">Model*</Form.Label>
            <Form.Control
              type="text"
              placeholder="E.g. Beat, TMX125 Alpha, XRM125 DS"
              onChange={(e) => setModel(e.target.value)}
              value={model}
              className={emptyFields.includes("model") ? "error" : ""}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md={4}
            lg={4}
            xl={4}
            controlId="reg_num"
            className="mb-3"
          >
            <Form.Label className="fs-5">Reg Number*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Registration Number"
              onChange={(e) => setRegNum(e.target.value)}
              value={reg_num}
              className={emptyFields.includes("regNum") ? "error" : ""}
            />
          </Form.Group>
        </Row>

        <Form.Group
          className="mb-5 mt-3 formGridCheckbox"
          id="formGridCheckbox"
        >
          <Row className={emptyFields.includes("services") ? "error " : ""}>
            <Col sm={12}>
              <Form.Label className="fs-3">
                Which type of service would you like to book?*
              </Form.Label>
            </Col>
            {/* <Col sm={12} md={8}>
              {serviceList.map((service) => (
                <Form.Check
                  key={service.id}
                  type="checkbox"
                  name="services"
                  value={service.service_name}
                  onChange={handleChange}
                  label={service.service_name}
                />
              ))}
            </Col> */}
            <Col sm={12} md={8}>
              {serviceList.map((item) => (
                <Services
                  key={item.id}
                  value={item.service_name}
                  handleChange={handleChange}
                  label={item.service_name}
                  item={item}
                />
              ))}
            </Col>
            <Col sm={12} md={4}>
              Total Cost:{" "}
              <h4>
                Php <span>{costs}</span>
              </h4>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label className="fs-5">Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            onChange={(e) => setRemarks(e.target.value)}
            value={remarks}
            placeholder="Message (Optional)"
          />
        </Form.Group>
        <Button
          variant="primary"
          size="md"
          className="me-4"
          type="submit"
          // onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="outline-secondary"
          size="md"
          onClick={() => {
            navigate(`/account/bookings`);
          }}
        >
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default UserBookServiceForm;
