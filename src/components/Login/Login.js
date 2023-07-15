import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form.js";
import { authorize } from "../../utils/MainApi.js";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoading }) {
  const [authorizeError, setAuthorizeError] = useState("");
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
    setIsLoading(true);
    e.preventDefault();

    authorize(getValues("password"), getValues("email"))
      .then((user) => {
        if (user._id) {
          navigate("/", { replace: true });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setAuthorizeError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        setIsLoading(false);
      });
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <main className="login">
      <Form
        name="login"
        title="Рады видеть!"
        onSubmit={handleSubmit}
        btnText="Войти"
        isValid={isValid}
      >
        <label className="login__label">
          <span className="login__input-name">E-mail</span>
          <input
            className="login__input"
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
            })}
          />
          <span className="login__input-error login__input-error_active">
            {errors?.email && errors?.email?.message}
          </span>
        </label>
        <label className="login__label">
          <span className="login__input-name">Пароль</span>
          <input
            className="login__input"
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
          <span className="login__input-error login__input-error_active">
            {(errors?.password && errors?.password?.message) || authorizeError}
          </span>
        </label>
      </Form>
    </main>
  );
}

export default Login;
