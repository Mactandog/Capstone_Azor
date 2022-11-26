import React from "react";
import Container from "react-bootstrap/esm/Container";
import ActivityCard from "../../components/cards/users/ActivityCard";

import AddBookingBtn from "../../components/buttons/AddBookingBtn";

const UserHome = () => {
  return (
    <div>
      <Container className="mt-3 border-bottom border-secondary">
        <h1>Home</h1>
      </Container>
      <Container>
        <AddBookingBtn />
        <div className="d-flex flex-wrap m-3">
          <ActivityCard />
        </div>
      </Container>
    </div>
  );
};

export default UserHome;
