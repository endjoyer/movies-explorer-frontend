import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Form({ name, title, onSubmit, children, btnText, isValid, onExit }) {
  function handleExit() {
    onExit();
  }

  return (
    <>
      <form
        className={`form ${name === "profile" && "form_profile"}`}
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
            <button type="button" onClick={handleExit} className="form__exit">
              Выйти из аккаунта
            </button>
          ) : (
            (name === "login" && (
              <div className="form__link-container">
                Ещё не зарегистрированы?
                <Link to="/signup" className="form__link">
                  Регистрация
                </Link>
              </div>
            )) ||
            (name === "register" && (
              <div className="form__link-container">
                Уже зарегистрированы?
                <Link to="/signin" className="form__link">
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
