import React from "react";

const Services = ({ item, handleChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        name={item.service_name}
        value={item.service_name}
        onChange={event => handleChange(item, event)}
      />
      {item.service_name} - ₱{item.price}
    </div>
  );
};

export default Services;