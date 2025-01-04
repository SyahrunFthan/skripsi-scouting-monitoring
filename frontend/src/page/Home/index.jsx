import React from "react";
import {
  NavbarHomeComponents,
  HomeLandingComponents,
  NewsComponents,
  GrafikComponents,
} from "../../components";

const Home = () => {
  return (
    <div>
      <NavbarHomeComponents />
      <HomeLandingComponents />
      <NewsComponents />
      <GrafikComponents />
    </div>
  );
};

export default Home;
