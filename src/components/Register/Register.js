import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form.js";
import { useNavigate } from "react-router-dom";
import { registration } from "../../utils/MainApi.js";

function Register({ onRegister, isLoading }) {
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    registration(getValues("name"), getValues("email"), getValues("password"))
      .then((res) => {
        if (res) {
          navigate("/signin", {
            replace: true,
          });
        }
      })
      .catch((err) => {
        setRegisterError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
      });
    onRegister();
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    setRegisterError("");
  }, [register]);

  return (
    <>
      <main className="register">
        <Form
          name="register"
          title="Добро пожаловать!"
          isLoading={isLoading}
          onSubmit={handleSubmit}
          btnText="Регистрация"
          isValid={isValid}
        >
          <label className="register__label">
            <span className="register__input-name">Имя</span>
            <input
              className="register__input"
              name="name"
              type="text"
              {...register("name", {
                required: "Заполните это поле.",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа.",
                },
                maxLength: {
                  value: 40,
                  message: "Максимум 40 символов.",
                },
              })}
            />
            <span className="register__input-error register__input-error_active">
              {errors?.name?.message}
            </span>
          </label>
          <label className="register__label">
            <span className="register__input-name">E-mail</span>
            <input
              className="register__input"
              name="email"
              type="email"
              {...register("email", {
                required: "Заполните это поле.",
                minLength: {
                  value: 5,
                  message: "Минимум 5 символов.",
                },
                maxLength: {
                  value: 40,
                  message: "Максимум 40 символов.",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Неверный формат электронной почты",
                },
              })}
            />
            <span className="register__input-error register__input-error_active">
              {errors?.email && errors?.email?.message}
            </span>
          </label>
          <label className="register__label">
            <span className="register__input-name">Пароль</span>
            <input
              className="register__input"
              name="password"
              type="password"
              {...register("password", {
                required: "Заполните это поле.",
                minLength: {
                  value: 8,
                  message: "Минимум 8 символов.",
                },
                maxLength: {
                  value: 40,
                  message: "Максимум 40 символов.",
                },
              })}
            />
            <span className="register__input-error register__input-error_active">
              {(errors?.password && errors?.password?.message) || registerError}
            </span>
          </label>
        </Form>
      </main>
    </>
  );
}

export default Register;
