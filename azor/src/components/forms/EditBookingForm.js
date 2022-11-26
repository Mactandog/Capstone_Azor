import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Alert from "react-bootstrap/esm/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useBookingsContext } from "../hooks/useBookingsContext";
import Swal from "sweetalert2";

const EditBookingForm = () => {
  const { dispatch } = useBookingsContext();
  const { id, bookingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const [inputField, setInputField] = useState([]);

  const [date, setDate] = useState("");
  const [time_slot, setTimeSlot] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [reg_num, setRegNum] = useState("");
  const [services, setServices] = useState([]);
  const [remarks, setRemarks] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const stats = "Pending";
  const costs = 10000;

  console.log([date, time_slot, brand, model, services]);

  //GET BOOKING DETAILS
  useEffect(() => {
    const getBooking = async () => {
      const response = await fetch(`/api/bookings/${bookingId}`); // fetch data from the server
      const json = await response.json(); // pass to a variable to use the data

      // check if response is ok
      if (response.ok) {
        let date = new Date(json.date).toISOString().slice(0, 10);
        setDate(date);
        setTimeSlot(json.time_slot);
        setBrand(json.brand);
        setModel(json.model);
        setRegNum(json.reg_num);
        setServices(json.services);
        setRemarks(json.remarks);
        setLoading(false);
      }
    };
    getBooking();
  }, []);

  // let handleInput = (e) => {
  //   e.persist();
  //   setInputField({ ...inputField, [e.target.name]: e.target.value });
  // };

  // SELECTED SERVICES

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setServices(
      checked ? [...services, value] : services.filter((item) => item !== value)
    );
  };
  console.log(services);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleEdit = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Please take note of the changes you are about to make!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Updated!",
            `Your appointment with Ref. Num. <strong>${bookingId}</strong> has been updated.`,
            "success"
          );
          handleSubmit();
        }
      });
  };

  const handleCancel = () => {
    swalWithBootstrapButtons.fire({ title: "No Changes were made!" });
    navigate(`/account/user/${id}/bookings`);
  };

  const handleSubmit = async (e) => {
    const booking = {
      date,
      time_slot,
      brand,
      model,
      reg_num,
      services,
      remarks,
      stats,
      costs,
    };
    console.log(booking);
    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      body: JSON.stringify(booking),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      // setInputField([]);
      setServices([]);
      setError(null);
      setEmptyFields([]);
      console.log("Booking updated successfully", json);
      dispatch({ type: "UPDATE_BOOKING", payload: json });
      navigate(`/account/user/${id}/bookings`);
    }
  };

  const serviceList = [
    { id: 1, service_name: "Brakes" },
    { id: 2, service_name: "Change Oil" },
    { id: 3, service_name: "Tires & Batteries" },
    { id: 4, service_name: "Maintenance" },
    { id: 5, service_name: "MOT" },
  ];

  console.log(...(services === serviceList.service_name ? "checked" : ""));
  return (
    <>
      {loading ? (
        <Spinner animation="border" variant="danger" size="lg" />
      ) : (
        <Form onSubmit={handleSubmit} action={`/account/user/${id}/bookings`}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Row className="mb-3 mt-5">
            <Col sm={12}>Reference Number:</Col>
            <Col>
              <b>{bookingId}</b>
            </Col>
          </Row>
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
                // name="brand"
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
              <Col sm={12} md={8}>
                {serviceList.map((service) => (
                  <Form.Check
                    key={service.id}
                    type="checkbox"
                    value={service.service_name}
                    onChange={handleSelect}
                    label={service.service_name}
                    checked={
                      services.includes(service.service_name) ? true : false
                    }
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
            className="me-4"
            variant="primary"
            // type="submit"
            size="md"
            onClick={handleEdit}
          >
            Update
          </Button>
          <Button variant="outline-secondary" size="md" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      )}
    </>
  );
};

export default EditBookingForm;
