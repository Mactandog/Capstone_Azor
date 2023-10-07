import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Alert from "react-bootstrap/esm/Alert";
import { useBookingsContext } from "../hooks/useBookingsContext";

const BookServiceForm = () => {
  const { dispatch } = useBookingsContext();
  const [first_name, setFname] = useState("");
  const [date, setDate] = useState("");
  const [time_slot, setTimeSlot] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, steEmptyFields] = useState([]);

  console.log(first_name, date, time_slot);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const booking = { first_name, date, time_slot };

    const response = await fetch(`${process.env.API ?? ""}/api/bookings`, {
      method: "POST",
      body: JSON.stringify(booking),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setError(json.error);
      steEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setFname("");
      setDate("");
      setTimeSlot("");
      setError(null);
      steEmptyFields([]);
      console.log("New booking added", json);
      dispatch({ type: "CREATE_BOOKING", payload: json });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Label className="fs-3">
          To start your <span className="text-primary">booking</span>, please
          provide all the required information.
        </Form.Label>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row className="mb-3 mt-5">
          <Form.Group
            as={Col}
            md={6}
            lg={6}
            xl={6}
            controlId="firstName"
            className="mb-3"
          >
            <Form.Label className="fs-5">First Name*</Form.Label>
            <Form.Control
              type="text"
              // name="first_name"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              value={first_name}
              className={emptyFields.includes("fname") ? "error" : ""}
            />
          </Form.Group>

          {/* <Form.Group as={Col} controlId="lastName" className="mb-3">
            <Form.Label className="fs-5">Last Name*</Form.Label>
            <Form.Control type="text" placeholder="Last name" />
          </Form.Group> */}
        </Row>

        {/* <Row className="mb-3">
          <Form.Group
            as={Col}
            md={6}
            lg={6}
            xl={6}
            controlId="phone"
            className="mb-3"
          >
            <Form.Label className="fs-5">Phone*</Form.Label>
            <Form.Control type="text" placeholder="Phone" />
          </Form.Group>

          <Form.Group as={Col} controlId="email" className="mb-3">
            <Form.Label className="fs-5">Email*</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
        </Row> */}

        <Row className="mb-3">
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
              // name="date"
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

        {/* <Row>
          <Form.Group
            as={Col}
            md={4}
            lg={4}
            xl={4}
            controlId="brand"
            className="mb-3"
          >
            <Form.Label className="fs-5">Brand*</Form.Label>
            <Form.Select id="brand" name="brand"> */}
        {/* <option selected disabled value="">
                Select Brand
              </option> */}
        {/* <option value="Honda">Honda</option>
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
            <Form.Control type="text" placeholder="Registration Number" />
          </Form.Group>
        </Row> */}

        {/* <Form.Group className="mb-5 mt-5" id="formGridCheckbox">
          <Form.Label className="fs-3">
            Which type of service would you like to book?*
          </Form.Label>
          <Form.Check type="checkbox" id="brake" name="brake" label="Brakes" />
          <Form.Check
            type="checkbox"
            id="oil_change"
            name="oil_change"
            label="Oil Change"
          />
          <Form.Check
            type="checkbox"
            id="tires_battery"
            name="tires_battery"
            label="Tires & Batteries"
          />
          <Form.Check
            type="checkbox"
            id="maintenance"
            name="maintenance"
            label="Maintenance"
          />
        </Form.Group> */}

        <Button variant="primary" type="submit" size="lg">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default BookServiceForm;
