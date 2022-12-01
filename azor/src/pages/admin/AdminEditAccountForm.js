import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/esm/Spinner";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../assets/media/images/Avatar.png";
import { useAuthContext } from "../../components/hooks/useAuthContext";

const AdminEditAcoountForm = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
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
        setPicture(json.picture);
      }
    };
    if (user) {
      getUser();
    }
  }, [user]);

  return (
    <div>
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
          <Form>
            <div className="mt-5 d-flex flex-column align-items-center">
              <img
                src={Avatar}
                alt="Avatar"
                className=""
                style={{ borderRadius: "50%", width: "100px" }}
              />

              <input type="file" id="upload" hidden />
              <label htmlFor="upload" className="btn-secondary mt-2">
                Upload image
              </label>
            </div>
            <div className="py-5">
              <div className="mb-5">
                <span>User role:</span>
                <h4>ADMIN</h4>
              </div>
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
                <Form.Group controlId="email" as={Col}>
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group controlId="password" as={Col}>
                  <div className="d-flex">
                    <Form.Label className="fw-bold">Password</Form.Label>
                    <Form.Label
                      className="fw-semibold ms-auto text-primary"
                      as={Link}
                      to={`/account/user/${id}/account-settings/change-password`}
                    >
                      Change Password
                    </Form.Label>
                  </div>
                  <Form.Control
                    type="password"
                    name="password"
                    disabled
                    value="JKHJKSDdadasdas"
                  />
                </Form.Group>
              </Row>
            </div>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default AdminEditAcoountForm;
