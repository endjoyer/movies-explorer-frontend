import React, { useRef } from "react";
import Header from "../Header/Header";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import Footer from "../Footer/Footer";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

function Main() {
  const aboutProjectRef = useRef(null);
  const techsRef = useRef(null);
  const aboutMeRef = useRef(null);

  const scrollToAboutProject = () => {
    if (aboutProjectRef.current) {
      aboutProjectRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTechs = () => {
    if (techsRef.current) {
      techsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAboutMe = () => {
    if (aboutMeRef.current) {
      aboutMeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <main className="main">
        <Promo
          scrollToAboutProject={scrollToAboutProject}
          scrollToTechs={scrollToTechs}
          scrollToAboutMe={scrollToAboutMe}
        />
        <AboutProject aboutProjectRef={aboutProjectRef} />
        <Techs techsRef={techsRef} />
        <AboutMe aboutMeRef={aboutMeRef} />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;
