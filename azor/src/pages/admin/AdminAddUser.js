import React from "react";
import Container from "react-bootstrap/esm/Container";
import AddUserAdminForm from "../../components/forms/AddUserAdminForm";

const AdminAddUser = () => {
  return (
    <div>
      <Container className="mt-3 border-bottom border-secondary ">
        <h1>
          <i className="fa-solid fa-user-plus text-primary"></i> Add New Admin
        </h1>
      </Container>
      <Container className="my-5">
        <AddUserAdminForm />
      </Container>
    </div>
  );
};

export default AdminAddUser;
