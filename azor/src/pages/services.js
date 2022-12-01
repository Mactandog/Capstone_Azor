import React from "react";
import Container from "react-bootstrap/esm/Container";

import ServicesBanner from "../components/banners/ServicesBanner";
import Breaks from "../components/sections/services/Breaks";
import Maintenance from "../components/sections/services/Maintenance";
import OilChange from "../components/sections/services/OilChange";
import TiresBatteries from "../components/sections/services/TiresBatteries";
// import BookServiceForm from "../components/forms/BookServiceForm";

const Services = () => {
  return (
    <>
      <ServicesBanner />

      <Breaks />
      <div className="bg-light">
        <OilChange />
      </div>
      <TiresBatteries />
      <div className="bg-light">
        <Maintenance />
      </div>
    </>
  );
};

export default Services;
