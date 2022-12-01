import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/esm/Spinner";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../assets/media/images/Avatar.png";

const UserChangePassword = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {};
  return (
    <div>
      <Container className="mt-3 border-bottom border-secondary ">
        <h1>Change Password</h1>
      </Container>
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
        <Container className="my-5">
          <Form>
            <Row className="mb-4">
              <Form.Group controlId="password" as={Col}>
                <Form.Label className="fw-bold">Current Password</Form.Label>
                <Form.Control type="password" name="password" />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group controlId="new_password" as={Col}>
                <Form.Label className="fw-bold">New Password</Form.Label>
                <Form.Control type="password" name="new_password" />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group controlId="confirm_password" as={Col}>
                <Form.Label className="fw-bold">Confirm Password</Form.Label>
                <Form.Control type="password" name="confirm_password" />
              </Form.Group>
            </Row>
            <Button onClick={handleSubmit}>Submit</Button>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default UserChangePassword;
