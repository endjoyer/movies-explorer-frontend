import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form.js";

function Login({ onAuthorization, isLoading }) {
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

    onAuthorization(getValues("password"), getValues("email"));
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <>
      <main className="login__content">
        <Form
          name="login"
          title="Рады видеть!"
          isLoading={isLoading}
          onSubmit={handleSubmit}
          btnText="Войти"
          isValid={isValid}
        >
          <label className="login__label">
            <p className="login__input-name">E-mail</p>
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
            <p className="login__input-name">Пароль</p>
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
              {errors?.password && errors?.password?.message}
            </span>
          </label>
        </Form>
      </main>
    </>
  );
}

export default Login;
