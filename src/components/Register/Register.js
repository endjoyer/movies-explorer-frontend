import { useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../Form";
import { useForm } from "react-hook-form";

const Register = ({ onRegister }) => {
  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    onRegister(data);
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="auth">
      <Form
        name="auth"
        title="Регистрация"
        onSubmit={handleSubmit(onSubmit)}
        btnText="Зарегистрироваться"
        isValid={isValid}
      >
        <label className="popup__label">
          <input
            className="popup__input popup__input_auth"
            name="email"
            placeholder="Email"
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
          <span className="email-error popup__input-error popup__input-error_active">
            {errors?.email && errors?.email?.message}
          </span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_auth"
            name="password"
            placeholder="Пароль"
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
          <span className="password-error popup__input-error popup__input-error_active">
            {errors?.password && errors?.password?.message}
          </span>
        </label>
        <div className="auth__signup">
          <p className="signup__text">Уже зарегистрированы?</p>
          <Link to="/signin" className="signup__link">
            Войти
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
