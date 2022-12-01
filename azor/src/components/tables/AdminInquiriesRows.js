import React, { useState } from "react";
import Badge from "react-bootstrap/esm/Badge";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import ViewBookingModal from "../modals/ViewBookingModal";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminInquiresRows = ({ inquiry }) => {
  // const { user } = useAuthContext();

  let dateCreated = new Date(`${inquiry.createdAt}`).toLocaleDateString();

  return (
    <>
      <tr>
        <td>
          {inquiry.first_name} {inquiry.last_name}
        </td>
        <td>{inquiry.email}</td>
        <td>{inquiry.message}</td>
        <td>{dateCreated}</td>
      </tr>
    </>
  );
};

export default AdminInquiresRows;
