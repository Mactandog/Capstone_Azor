import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import Avatar from "../../assets/media/images/Avatar.png";
import Swal from "sweetalert2";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUsersContext } from "../hooks/useUsersContext";
import Alert from "react-bootstrap/Alert";

const AddUserAdminForm = () => {
  const { dispatch: userDispatch } = useUsersContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const isAdmin = true;

  // const swalWithBootstrapButtons = Swal.mixin({
  //   customClass: {
  //     confirmButton: "btn btn-success me-3",
  //     cancelButton: "btn btn-danger",
  //   },
  //   buttonsStyling: false,
  // });

  //// VALIDATIONS ///
  const isRequired = (value) => (value == "" ? true : false);
  const isBetween = (length, min, max) =>
    length >= min && length <= max ? true : false;
  // const isEmailValid = (email) => {
  //   let emailPattern = new RegExp(
  //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
  //   return emailPattern.test(email);
  // };

  const isPasswordValid = (password) => {
    let passwordPattern = new RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    );
    return passwordPattern.test(password);
  };

  const isLettersOnly = (name) => {
    let namePattern = new RegExp(/^[A-Za-z\s]*$/);
    return namePattern.test(name);
  };
  // const isNumbersOnly = (zip) => {
  //   let zipPattern = new RegExp(/^\d+$/);
  //   return zipPattern.test(zip);
  // };
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

  // const checkEmail = () => {
  //   if (isRequired(email)) {
  //     setError("Email is required");
  //     return false;
  //   } else if (!isEmailValid(email)) {
  //     setError("Email is not valid");
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  const checkPassword = () => {
    const min = 8;
    const max = 30;
    if (isRequired(password)) {
      setError("Password is required");
      return false;
    } else if (!isBetween(password.length, min, max)) {
      setError("Password must be 8 to 30 characters long");
      return false;
    } else if (!isPasswordValid(password)) {
      setError(
        "Password must have at least one number and one special character."
      );
      return false;
    } else {
      return true;
    }
  };

  const checkConfirmPass = () => {
    if (isRequired(confirm_password)) {
      setError("Confirm password is required");
      return false;
    } else if (confirm_password !== password) {
      setError("Password does not match");
      return false;
    } else {
      return true;
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!user) {
  //     setError("You must be logged in!");
  //     return;
  //   }

  //   if (
  //     checkFirstName() === true &&
  //     checkLastName() === true &&
  //     checkEmail() === true &&
  //     checkPassword() === true &&
  //     checkConfirmPass() === true
  //   ) {
  //     swalWithBootstrapButtons
  //       .fire({
  //         title: "Are you sure?",
  //         text: "Make sure to review the user details before submitting!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Yes, add user!",
  //       })
  //       .then((result) => {
  //         if (result.isConfirmed) {
  //           swalWithBootstrapButtons.fire(
  //             "New user created!",
  //             "You may now login.",
  //             "success"
  //           );
  //           addUser();
  //         }
  //       });
  //   }
  // };

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

  const addUser = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in!");
      return;
    }

    if (
      checkFirstName() === true &&
      checkLastName() === true &&
      // checkEmail() === true &&
      checkPassword() === true &&
      checkConfirmPass() === true
    ) {
      const userInfo = {
        first_name,
        last_name,
        isAdmin,
        email,
        password,
        picture,
      };
      console.log(userInfo);

      const response = await fetch("/api/users/create", {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: "New user created",
        });
        setPicture("");
        setFirst_name("");
        setLast_name("");
        setEmail("");
        setPassword("");
        setConfirm_password([]);
        setError(null);
        setEmptyFields([]);
      }
      userDispatch({ type: "CREATE_USER", payload: json });
      console.log("New Admin user added", json);
      // console.log(json);
    }
  };

  return (
    <>
      <Form onSubmit={addUser}>
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
                // className={emptyFields.includes("first_name") ? "error" : ""}
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
                // className={emptyFields.includes("last_name") ? "error" : ""}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group controlId="email" as={Col} md={6}>
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                // className={emptyFields.includes("email") ? "error" : ""}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group controlId="password" as={Col}>
              <div className="d-flex">
                <Form.Label className="fw-bold">Password</Form.Label>
              </div>
              <Form.Control
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                // className={emptyFields.includes("password") ? "error" : ""}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group controlId="confirm_password" as={Col}>
              <div className="d-flex">
                <Form.Label className="fw-bold">Confirm Password</Form.Label>
              </div>
              <Form.Control
                type="password"
                name="confirm_password"
                onChange={(e) => setConfirm_password(e.target.value)}
                value={confirm_password}
                // className={
                //   emptyFields.includes("confirm_password") ? "error" : ""
                // }
              />
            </Form.Group>
          </Row>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>

        <Button type="submit">Add User</Button>
      </Form>
    </>
  );
};

export default AddUserAdminForm;
