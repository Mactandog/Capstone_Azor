import React, { useState } from "react";
import Badge from "react-bootstrap/esm/Badge";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import ViewBookingModal from "../modals/ViewBookingModal";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminUserRows = ({ user }) => {
  // const { user } = useAuthContext();

  let dateCreated = new Date(`${user.createdAt}`).toLocaleDateString();

  return (
    <>
      <tr>
        <td>{user._id}</td>
        <td>
          {user.first_name} {user.last_name}
        </td>
        <td>
          {" "}
          <Badge
            bg={user.isAdmin === true ? "info" : "dark"}
            className="ms-auto"
          >
            {user.isAdmin === true ? "Admin" : "Basic User"}
          </Badge>
        </td>
        <td>{dateCreated}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
      </tr>
    </>
  );
};

export default AdminUserRows;
