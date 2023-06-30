import { useRef } from "react";
function NavTab() {
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ul className="navtab">
      <li className="navtab__list-item">
        <button className="navtab__button">О проекте</button>
      </li>
      <li className="navtab__list-item">
        <button className="navtab__button">Технологии</button>
      </li>
      <li className="navtab__list-item">
        <button className="navtab__button">Студент</button>
      </li>
    </ul>
  );
}

export default NavTab;
