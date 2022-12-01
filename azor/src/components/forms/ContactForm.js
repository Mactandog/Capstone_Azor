import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";

const ContactForm = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const createInquiry = async () => {
    const inquiry = {
      first_name,
      last_name,
      email,
      message,
    };
    console.log(inquiry);

    const response = await fetch("/api/inquiries/create", {
      method: "POST",
      body: JSON.stringify(inquiry),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setFirst_name("");
      setLast_name("");
      setEmail("");
      setMessage("");
      console.log("Inquiry Submitted", inquiry);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(inquiry);

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Make sure to review your details before submitting!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, submit inquiry!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Inquiry sent!",
            `Thank you for sending us an inquiry. We'll update you via email regarding your inquiry.`,
            "success"
          );
          createInquiry();
        }
      });
  };

  return (
    <>
      <Form className="mb-5" onSubmit={handleSubmit}>
        <Form.Label className="fs-2 mt-5 fw-bold">
          Make a general enquiry
        </Form.Label>
        <Form.Label className="fs-5">
          If you're not totally sure what you're looking for or you'd like to
          contact us with a general enquiry, our friendly team is here to help.
        </Form.Label>
        <Row className="mb-3 mt-5">
          <Col as={Col} xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label className="fs-5">First Name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                onChange={(e) => setFirst_name(e.target.value.trim())}
                value={first_name}
                className={emptyFields.includes("first_name") ? "error" : ""}
                required
              />
            </Form.Group>

            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label className="fs-5">Last Name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                onChange={(e) => setLast_name(e.target.value.trim())}
                value={last_name}
                className={emptyFields.includes("last_name") ? "error" : ""}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="fs-5">Email*</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value.trim())}
                value={email}
                className={emptyFields.includes("email") ? "error" : ""}
                required
              />
            </Form.Group>
          </Col>
          <Col as={Col} xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Label className="fs-5">Message*</Form.Label>
            <Form.Control
              as="textarea"
              rows={12}
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value.trim())}
              value={message}
              className={emptyFields.includes("message") ? "error" : ""}
              required
            />
          </Col>
          <Col as={Col} xs={12} sm={12} md={6} lg={6} xl={6}>
            {error && <Alert variant="danger">{error}</Alert>}
          </Col>
        </Row>
        <div className="mb-2">
          <Form.Check
            type="checkbox"
            id="subscribe"
            name="subscribe"
            value="true"
            label="Please click here if you would like advance notice of offers and
            special events."
            className="fw-semibold"
          />
        </div>
        <div className="mb-2">
          <small>
            We will use this information to contact you about your chosen
            vehicle. We will also retain it in case you contact us in the
            future, to obtain feedback from you and to contact you about other
            offers and services provided by our group that may be of interest to
            you.
          </small>
        </div>
        <div className="mb-2">
          <small>
            By providing your details you consent to this and to us contacting
            you by the methods of contact that you have given above. You can
            tell us at any time if you don't want us to contact you.
          </small>
        </div>
        <div className="mb-2">
          <small>
            For more details on how we use your information please see our
            Privacy Policy (shown at the bottom of each web page).
          </small>
        </div>
        <div className="mb-4">
          <small>* Denotes a Mandatory field.</small>
        </div>

        <Button
          variant="primary"
          type="submit"
          className="text-white"
          size="lg"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ContactForm;
