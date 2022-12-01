import React from "react";
import Form from "react-bootstrap/Form";

const Services = ({ item, handleChange }) => {
  return (
    <div>
      <Form.Check
        type="checkbox"
        name={item.service_name}
        value={item.service_name}
        onChange={(event) => handleChange(item, event)}
        label={`${item.service_name} - ₱${item.price}`}
      />
    </div>
  );
};

export default Services;
