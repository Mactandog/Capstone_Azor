import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  return (
    <Card className="bg-white py-5 px-4">
      <h1 className="fs-1 fw-semibold text-center">Log in to Azor</h1>
      <h6 className="fs-6 mb-4 text-center">
        No more hassles with Motorcycle servicing and repairs.
      </h6>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Floating className="mb-3">
          <Form.Control
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="email">Email address*</label>
        </Form.Floating>
        <Form.Floating>
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label htmlFor="password">Password*</label>
        </Form.Floating>
        <Stack className="my-4" gap={3}>
          <Button variant="primary" type="submit">
            Log in
          </Button>
          <Button variant="outline-primary" type="button" href="/register">
            Dont have an account? Register
          </Button>
          <Link
            type="button"
            to="/recover-password"
            style={{
              textDecoration: "none",
              textAlign: "center",
              textColor: "secondary",
            }}
          >
            Forgotten your password?
          </Link>
        </Stack>
      </Form>
      <small>* Denotes a Mandatory field.</small>
      <br></br>
      <small>
        To understand how we take care of your personal details, please view our{" "}
        <Link to="/privacy-policy">Privacy Policy</Link>
      </small>
    </Card>
  );
};

export default LoginForm;
