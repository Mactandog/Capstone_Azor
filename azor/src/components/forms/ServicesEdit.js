import React from 'react'

const ServicesEdit = ({ item, handleChange, services }) => {
    return (
      <div>
        <input
          type="checkbox"
          name={item.service_name}
          value={item.service_name}
          onChange={event => handleChange(item, event)}
          checked={
            services.includes(item.service_name) ? true : false
          }
        />
        {item.service_name} - ₱{item.price}
        
      </div>
    );
  };

export default ServicesEdit
