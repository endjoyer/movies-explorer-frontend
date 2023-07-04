import { Link } from "react-router-dom";

function HamburgerMenu() {
  return (
    <div className="hamburger-menu">
      <input id="hamburger-menu__toggle" type="checkbox" />
      <label className="hamburger-menu__btn" htmlFor="hamburger-menu__toggle">
        <span></span>
      </label>

      <ul className="hamburger-menu__box">
        <div className="hamburger-menu__cover" />
        <li>
          <Link to="/" className="hamburger-menu__item">
            Главная
          </Link>
        </li>
        <li>
          <Link to="/movies" className="hamburger-menu__item">
            Фильмы
          </Link>
        </li>
        <li>
          <Link to="/saved-movies" className="hamburger-menu__item">
            Сохраненные фильмы
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hamburger-menu__item">
            Аккаунт <div className=""></div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HamburgerMenu;
