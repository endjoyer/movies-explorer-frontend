import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Form({
  name,
  title,
  onSubmit,
  children,
  isLoading,
  btnText,
  isValid,
}) {
  return (
    <>
      <form
        className={`form ${name === "auth" ? "form_auth" : ""}`}
        onSubmit={onSubmit}
        noValidate
      >
        {name !== "profile" && <Logo />}
        <h3
          className={`form__title ${
            name !== "profile" && "form__title_not-profile"
          }`}
        >
          {title}
        </h3>
        {children}
        <div className="form__buttons">
          <button
            className={`form__btn ${
              name === "profile" && "form__btn-profile"
            } ${!isValid && "form__btn_inactive"}`}
            type="submit"
          >
            {btnText}
          </button>
          {name === "profile" ? (
            <button type="button" className="form__exit">
              Выйти из аккаунта
            </button>
          ) : (
            (name === "login" && (
              <div className="form__link-container">
                Ещё не зарегистрированы?
                <Link to="/signin" className="form__link">
                  Регистрация
                </Link>
              </div>
            )) ||
            (name === "register" && (
              <div className="form__link-container">
                Уже зарегистрированы?
                <Link to="/signup" className="form__link">
                  Войти
                </Link>
              </div>
            ))
          )}
        </div>
      </form>
    </>
  );
}

export default Form;
