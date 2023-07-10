import React from "react";

function NavTab({ scrollToAboutProject, scrollToTechs, scrollToAboutMe }) {
  return (
    <ul className="navtab">
      <li className="navtab__list-item">
        <button className="navtab__button" onClick={scrollToAboutProject}>
          О проекте
        </button>
      </li>
      <li className="navtab__list-item">
        <button className="navtab__button" onClick={scrollToTechs}>
          Технологии
        </button>
      </li>
      <li className="navtab__list-item">
        <button className="navtab__button" onClick={scrollToAboutMe}>
          Студент
        </button>
      </li>
    </ul>
  );
}

export default NavTab;
