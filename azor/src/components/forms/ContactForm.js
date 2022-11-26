import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const ContactForm = () => {
  return (
    <>
      <Form className="mb-5">
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
              <Form.Control type="text" placeholder="First name" required />
            </Form.Group>

            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label className="fs-5">Last Name*</Form.Label>
              <Form.Control type="text" placeholder="Last name" required />
            </Form.Group>

            <Form.Group controlId="phone" className="mb-3">
              <Form.Label className="fs-5">Phone*</Form.Label>
              <Form.Control type="text" placeholder="Phone" required />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="fs-5">Email*</Form.Label>
              <Form.Control type="email" placeholder="Email" required />
            </Form.Group>
          </Col>
          <Col as={Col} xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Label className="fs-5">Message*</Form.Label>
            <Form.Control
              as="textarea"
              rows={12}
              placeholder="Message"
              required
            />
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
