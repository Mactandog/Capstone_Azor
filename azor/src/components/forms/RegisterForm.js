import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useSignUp } from "../hooks/useSignUp";

const RegisterForm = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAgree, setIsAgree] = useState(true);
  const { signup, isLoading, error } = useSignUp();

  //validations

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(first_name, last_name, email, password);
    await signup(first_name, last_name, email, password);
  };

  return (
    <Card className="bg-white py-5 px-4">
      <h1 className="fs-1 fw-semibold text-center">Register to Azor</h1>
      <h6 className="fs-6 mb-4 text-center">
        No more hassles with Motorcycle servicing and repairs.
      </h6>
      {error && <Alert variant="danger">{error}</Alert>}
      <small>
        <b>*</b> Denotes a mandatory field.
      </small>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="first_name"
                name="first_name"
                type="text"
                placeholder="First name"
                onChange={(e) => setFirst_name(e.target.value.trim())}
                value={first_name}
              />
              <label htmlFor="first_name">First Name*</label>
            </Form.Floating>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Last name"
                onChange={(e) => setLast_name(e.target.value.trim())}
                value={last_name}
              />
              <label htmlFor="last_name">Last Name*</label>
            </Form.Floating>
          </Col>
        </Row>
        <Form.Floating className="mb-3">
          <Form.Control
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value.trim())}
            value={email}
          />
          <label htmlFor="email">Email address*</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value.trim())}
            value={password}
          />
          <label htmlFor="password">Password*</label>
          <p className="form-text text-muted">
            Include a minimum of 8 characters, 1 uppercase, 1 lowercase, 1
            number and 1 symbol
          </p>
        </Form.Floating>
        {/* <Form.Floating>
          <Form.Control
            id="confirm_password"
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirm_password(e.target.value.trim())}
            value={confirm_password}
          />
          <label htmlFor="confirm_password">Confirm Password*</label>
        </Form.Floating> */}
        <Form.Group controlId="agreeToTerms" className="mt-3">
          <Form.Check
            label="By signing up, you agree to the terms and conditions of Azor Motorcycle Services."
            id="terms"
            onChange={(e) => setIsAgree(e.target.checked)}
            defaultChecked={isAgree}
          />
        </Form.Group>
        <Stack className="my-4" gap={3}>
          <Button
            variant="primary"
            type="submit"
            disabled={isAgree === true ? false : true}
          >
            Register
          </Button>
          <Button variant="outline-primary" type="button" href="/login">
            Already have an account? Log in
          </Button>
        </Stack>
      </Form>
      <small>
        To understand how we take care of your personal details, please view our{" "}
        <Link to="/privacy-policy">Privacy Policy</Link>
      </small>
    </Card>
  );
};

export default RegisterForm;
