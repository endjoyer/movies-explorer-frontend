import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form.js";

function Register({ onAuthorization, isLoading }) {
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

    onAuthorization(
      getValues("password"),
      getValues("email"),
      getValues("name")
    );
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <>
      <Form
        name="register"
        title="Добро пожаловать!"
        isLoading={isLoading}
        onSubmit={handleSubmit}
        btnText="Регистрация"
        isValid={isValid}
      >
        <label className="register__label">
          <p className="register__input-name">Имя</p>
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
          <p className="register__input-name">E-mail</p>
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
            })}
          />
          <span className="register__input-error register__input-error_active">
            {errors?.email && errors?.email?.message}
          </span>
        </label>
        <label className="register__label">
          <p className="register__input-name">Пароль</p>
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
            {errors?.password && errors?.password?.message}
          </span>
        </label>
      </Form>
    </>
  );
}

export default Register;
