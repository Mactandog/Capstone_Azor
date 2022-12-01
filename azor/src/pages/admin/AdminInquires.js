import React from "react";
import Container from "react-bootstrap/esm/Container";
import AdminUserListTable from "../../components/tables/AdminInquiriesTable";

const AdminInquires = () => {
  return (
    <div>
      <Container className="mt-3 border-bottom border-secondary ">
        <h1>
          <i className="fa-solid fa-square-envelope text-primary"></i> General
          Inquiries
        </h1>
      </Container>
      <Container className="my-5">
        <AdminUserListTable />
      </Container>
    </div>
  );
};

export default AdminInquires;
