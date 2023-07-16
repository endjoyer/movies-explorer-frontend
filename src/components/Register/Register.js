import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form.js";
import { useNavigate } from "react-router-dom";
import { authorize, registration } from "../../utils/MainApi.js";

function Register({ setIsLoading }) {
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    registration(getValues("name"), getValues("email"), getValues("password"))
      .then((res) => {
        if (res) {
          authorize(getValues("password"), getValues("email"))
            .then((user) => {
              if (user._id) {
                navigate("/movies", { replace: true });
              }
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
              navigate("/signin", {
                replace: true,
              });
              setIsLoading(false);
            });
        }
      })
      .catch((err) => {
        setRegisterError(
          err === "409"
            ? "Данный E-mail уже используется."
            : "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setRegisterError("");
  }, [isValid]);

  return (
    <>
      <main className="register">
        <Form
          name="register"
          title="Добро пожаловать!"
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
                pattern: {
                  value: /^[A-Za-zа-яА-ЯёЁa -]*$/i,
                  message:
                    "Имя может содержать только латиницу, кириллицу, пробел или дефис",
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
