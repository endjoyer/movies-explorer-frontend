import React from "react";
import NavTab from "../NavTab/NavTab";

function Promo({ scrollToAboutProject, scrollToTechs, scrollToAboutMe }) {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab
        scrollToAboutProject={scrollToAboutProject}
        scrollToTechs={scrollToTechs}
        scrollToAboutMe={scrollToAboutMe}
      />
    </section>
  );
}

export default Promo;
