import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const isSignUpPage = pathname === "/signup";
  const isMainPage = pathname === "/";

  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo" />
      </Link>
      <nav>
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
        <Link to="/signin" className="header__link header__link_signin">
          Войти
        </Link>
      </nav>
    </header>
  );
}

export default Header;
