import React from "react";
import ToastContainer from "react-bootstrap/esm/ToastContainer";
import Toast from "react-bootstrap/Toast";

const SuccessToast = ({ notif, setNotif, title, message }) => {
  return (
    <>
      <ToastContainer className="p-3" position="bottom-center">
        <Toast
          className=" text-white"
          onClose={() => setNotif(false)}
          show={notif}
          delay={3000}
          autohide
          style={{ backgroundColor: "#38E54D" }}
        >
          <Toast.Header closeButton={true}>
            <i
              class="fa-regular fa-calendar-check text-primary"
              style={{
                fontSize: "30px",
                marginRight: "10px",
              }}
            ></i>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default SuccessToast;
