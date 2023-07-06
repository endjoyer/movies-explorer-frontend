import React from "react";

function Form({
  name,
  title,
  onSubmit,
  onClose,
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
        <h3
          className={`form__title ${name === "auth" ? "form__title_auth" : ""}`}
        >
          {title}
        </h3>
        {children}
        <button
          className={`form__btn ${name === "profile" && "form__btn-profile"} ${
            isValid && "form__btn_inactive"
          }`}
          type="submit"
        >
          {btnText}
        </button>
      </form>
    </>
  );
}

export default Form;
