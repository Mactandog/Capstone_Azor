import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/esm/Badge";
import Table from "react-bootstrap/Table";
import { useBookingsContext } from "../hooks/useBookingsContext";
import { useUsersContext } from "../hooks/useUsersContext";
import BookingsRows from "./BookingsRows";
import { useAuthContext } from "../hooks/useAuthContext";
import AdminUserRows from "./AdminUserRows";

const AdminUserListTable = () => {
  const { user } = useAuthContext();
  const { users, dispatch } = useUsersContext();
  console.log(users);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users/", {
        headers: { Authorization: `Bearer ${user.token}` },
      }); // fetch data from the server
      const json = await response.json(); // pass to a variable to use the data

      // check if response is ok
      if (response.ok) {
        dispatch({ type: "GET_USERS", payload: json });
      }
    };
    if (user) {
      fetchUsers();
    }
  }, [dispatch, user]);

  return (
    <div className="">
      <Table hover responsive variant="light">
        <thead>
          <tr>
            <th>ID Number</th>
            <th>Name</th>
            <th>User Type</th>
            <th>Date Created</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => <AdminUserRows key={user._id} user={user} />)}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminUserListTable;
