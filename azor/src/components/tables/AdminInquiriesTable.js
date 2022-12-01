import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/esm/Badge";
import Table from "react-bootstrap/Table";
import { useBookingsContext } from "../hooks/useBookingsContext";
import { useUsersContext } from "../hooks/useUsersContext";
import BookingsRows from "./BookingsRows";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCustomerInquiryContext } from "../hooks/useInquiriesContext";
import AdminUserRows from "./AdminUserRows";
import AdminInquiresRows from "./AdminInquiriesRows";

const AdminUserListTable = () => {
  const { user } = useAuthContext();
  const { inquiries, dispatch } = useCustomerInquiryContext();

  useEffect(() => {
    const fetchInquires = async () => {
      const response = await fetch("/api/inquiries", {
        headers: { Authorization: `Bearer ${user.token}` },
      }); // fetch data from the server
      const json = await response.json(); // pass to a variable to use the data

      // check if response is ok
      if (response.ok) {
        dispatch({ type: "GET_INQUIRIES", payload: json });
      }
    };
    if (user) {
      fetchInquires();
    }
  }, [dispatch, user]);

  return (
    <div className="">
      <Table hover responsive variant="light">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date Recieved</th>
          </tr>
        </thead>
        <tbody>
          {inquiries &&
            inquiries.map((inquiry) => (
              <AdminInquiresRows key={inquiry._id} inquiry={inquiry} />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminUserListTable;
