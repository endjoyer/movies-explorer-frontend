import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import Logo from "../Logo/Logo";

function Header() {
  const { _id: userId } = useContext(CurrentUserContext);
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";
  const isMoviesPage = pathname === "/movies";
  const isSavedMoviesPage = pathname === "/saved-movies";
  const isProfilePage = pathname === "/profile";
  console.log(userId);
  return (
    <header className="header">
      <Logo />
      {!userId ? (
        <nav>
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>
          <Link to="/signin" className="header__link header__link_signin">
            Войти
          </Link>
        </nav>
      ) : (
        <>
          <ul className="header__links">
            <li>
              <Link to="/movies" className="header__link">
                Фильмы
              </Link>
            </li>
            <li>
              <Link to="/saved-movies" className="header__link">
                Сохраненные фильмы
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="header__link  header__link_profile"
              >
                Аккаунт <div className="header__profile-icon" />
              </Link>
            </li>
          </ul>
          <HamburgerMenu
            isMainPage={isMainPage}
            isMoviesPage={isMoviesPage}
            isSavedMoviesPage={isSavedMoviesPage}
            isProfilePage={isProfilePage}
          />
        </>
      )}
    </header>
  );
}

export default Header;
