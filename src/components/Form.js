import React from "react";

const Form = React.forwardRef(
  (
    { name, title, onSubmit, onClose, children, isLoading, btnText, isValid },
    ref
  ) => {
    return (
      <>
        <form
          ref={ref}
          className={`popup__container ${
            name === "auth" ? "popup__container_auth" : ""
          }`}
          onSubmit={onSubmit}
          noValidate
        >
          <h3
            className={`popup__title ${
              name === "auth" ? "popup__title_auth" : ""
            }`}
          >
            {title}
          </h3>
          <button
            className={` ${
              name === "auth" ? "popup__close_auth" : "popup__close"
            }`}
            aria-label="Закрыть"
            type="button"
            onClick={onClose}
          />
          {children}
          <button
            className={`popup__btn ${
              name === "auth" ? "popup__btn_auth" : ""
            } ${
              name !== "confirmation"
                ? isValid
                  ? ""
                  : "popup__btn_inactive"
                : ""
            }`}
            type="submit"
          >
            <span
              className={`popup__btn-text ${
                isLoading ? "popup__btn-text_loading" : ""
              }`}
            >
              {btnText}
            </span>
          </button>
        </form>
      </>
    );
  }
);

export default Form;
