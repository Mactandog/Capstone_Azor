import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/esm/Form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Avatar from "../../assets/media/images/Avatar.png";
import { useAuthContext } from "../hooks/useAuthContext";
import Alert from "react-bootstrap/Alert";

const UserEditProfileForm = () => {
  const { user } = useAuthContext();

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  //GET BOOKING DETAILS
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/users/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      }); // fetch data from the server
      const json = await response.json(); // pass to a variable to use the data

      // check if response is ok
      if (response.ok) {
        setFirst_name(json.first_name);
        setLast_name(json.last_name);
        setEmail(json.email);
        setPassword(json.password);
        setPhone(json.phone);
        setPicture(json.picture);
      }
    };
    if (user) {
      getUser();
    }
  }, [user]);

  //// VALIDATIONS ///
  const isRequired = (value) => (value === "" ? true : false);
  const isBetween = (length, min, max) =>
    length >= min && length <= max ? true : false;

  const isLettersOnly = (name) => {
    let namePattern = new RegExp(/^[A-Za-z\s]*$/);
    return namePattern.test(name);
  };

  const isNumbersOnly = (value) => {
    let zipPattern = new RegExp(/^\d+$/);
    return zipPattern.test(value);
  };
  ///////////

  const checkFirstName = () => {
    if (isRequired(first_name)) {
      setError("First name is required");
      return false;
    } else if (!isLettersOnly(first_name)) {
      setError("First name must be letters only");
      return false;
    } else {
      return true;
    }
  };

  const checkLastName = () => {
    if (isRequired(last_name)) {
      setError("Last name is required");
      return false;
    } else if (!isLettersOnly(last_name)) {
      setError("Last name must be letters only");
      return false;
    } else {
      return true;
    }
  };

  const checkPhone = () => {
    const min = 11;
    const max = 11;
    if (!isNumbersOnly(phone)) {
      setError("Phone must be numbers only");
      return false;
    } else if (isBetween(phone, min, max)) {
      setError("Phone should be 11 characters long");
      return false;
    } else {
      return true;
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const updateProfile = async (e) => {
    e.preventDefault();

    if (
      checkFirstName === true &&
      checkLastName === true &&
      checkPhone === true
    ) {
      const userDetails = {
        first_name,
        last_name,
        phone,
        picture,
      };
      console.log(userDetails);

      const response = await fetch(`/api/users/update${user._id}`, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
        setError(json.error);
      }

      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: "Profile updated successfully",
        });
        setError(null);
        console.log("Profile updated successfully", json);
      }
    }
  };

  return (
    <div>
      <Form onSubmit={updateProfile}>
        <div className="mt-5 d-flex flex-column align-items-center">
          <img
            src={Avatar}
            alt="Avatar"
            className=""
            style={{ borderRadius: "50%", width: "100px" }}
          />

          <Form.Control type="file" id="upload" hidden />
          <label htmlFor="upload" className="btn-secondary mt-2">
            Upload image
          </label>
        </div>
        <div className="py-5">
          <Row className="mb-4">
            <Form.Group
              className="mb-4"
              controlId="first_name"
              as={Col}
              md={6}
              lg={6}
              xl={6}
            >
              <Form.Label className="fw-bold">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="first_name"
                onChange={(e) => setFirst_name(e.target.value)}
                value={first_name}
              />
            </Form.Group>
            <Form.Group controlId="last_name" as={Col} md={6} lg={6} xl={6}>
              <Form.Label className="fw-bold">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="last_name"
                onChange={(e) => setLast_name(e.target.value)}
                value={last_name}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group controlId="phone" as={Col}>
              <Form.Label className="fw-bold">Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </Form.Group>
          </Row>
          {/* <Row className="mb-4">
            <Form.Group controlId="email" as={Col}>
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                disabled
              />
            </Form.Group>
          </Row> */}
          {/* <Row className="mb-4">
            <Form.Group controlId="password" as={Col}>
              <div className="d-flex">
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Label
                  className="fw-semibold ms-auto text-primary"
                  as={Link}
                  //   to={`/account/user/${id}/account-settings/change-password`}
                >
                  Change Password
                </Form.Label>
              </div>
              <Form.Control
                type="password"
                name="password"
                disabled
                value={password}
              />
            </Form.Group>
          </Row> */}
          <Button type="submit">Update Profile</Button>
        </div>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form className="border-top border-primary py-5">
        <span
          className="border-0 bg-none"
          style={{ cursor: "pointer", color: "#702df5" }}
        >
          Delete Account
        </span>
        <br></br>
        <span className="text-muted">
          This account will no longer be accessible. All your saved data will be
          permanently deleted
        </span>
      </Form>
    </div>
  );
};

export default UserEditProfileForm;
