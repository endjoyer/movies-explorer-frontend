import { Link } from "react-router-dom";

function HamburgerMenu({
  isMainPage,
  isMoviesPage,
  isSavedMoviesPage,
  isProfilePage,
}) {
  return (
    <div className="hamburger-menu">
      <input id="hamburger-menu__toggle" type="checkbox" />
      <label className="hamburger-menu__btn" htmlFor="hamburger-menu__toggle">
        <span></span>
      </label>

      <ul className="hamburger-menu__box">
        <li>
          <Link
            to="/"
            className={`hamburger-menu__item ${
              isMainPage && "hamburger-menu__item_active"
            }`}
          >
            Главная
          </Link>
        </li>
        <li>
          <Link
            to="/movies"
            className={`hamburger-menu__item ${
              isMoviesPage && "hamburger-menu__item_active"
            }`}
          >
            Фильмы
          </Link>
        </li>
        <li>
          <Link
            to="/saved-movies"
            className={`hamburger-menu__item ${
              isSavedMoviesPage && "hamburger-menu__item_active"
            }`}
          >
            Сохраненные фильмы
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`hamburger-menu__item hamburger-menu__item_profile ${
              isProfilePage && "hamburger-menu__item_active"
            }`}
          >
            Аккаунт <div className="hamburger-menu__profile-icon"></div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HamburgerMenu;
