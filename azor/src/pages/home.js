import React from "react";
import Container from "react-bootstrap/esm/Container";
import HeroBanner from "../components/banners/Hero";
import ServicesSection from "../components/sections/ServicesSection";
import WhyBook from "../components/sections/WhyBookSection";

const Home = () => {
  return (
    <>
      <div className="bg-white">
        <HeroBanner />
        <Container>
          <ServicesSection />
        </Container>
        <WhyBook />
      </div>
    </>
  );
};

export default Home;
