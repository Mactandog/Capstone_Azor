import React from "react";
import Container from "react-bootstrap/esm/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import AdminUserListTable from "../../components/tables/AdminUserListTable";

const AdminUserList = () => {
  return (
    <>
      <Container className="mt-3 border-bottom border-secondary ">
        <h1>
          <i className="fa-solid fa-users text-primary"></i> List of Users
        </h1>
      </Container>
      <Container className="my-5">
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Text input with dropdown button"
            placeholder="Search"
          />
          <DropdownButton
            variant="secondary"
            title="Filter by"
            id="input-group-dropdown-2"
            align="end"
          >
            <Dropdown.Item as={Link} to="#">
              Service
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="#">
              Brand/Model
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="#">
              Booking Date
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to="#">
              Status
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>
        <AdminUserListTable />
      </Container>
    </>
  );
};

export default AdminUserList;
