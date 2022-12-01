import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/esm/Spinner";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../assets/media/images/Avatar.png";
import UserEditProfileForm from "../../components/forms/UserEditProfileForm";

const UserSettings = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Container className="mt-3 border-bottom border-secondary">
        <h1>My Account</h1>
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
        <Container>
          <UserEditProfileForm />
        </Container>
      )}
    </div>
  );
};

export default UserSettings;
