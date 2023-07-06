import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form.js";
import Header from "../Header/Header.js";

function Profile({ onEditProfile, isLoading }) {
  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = getValues("name");
    const email = getValues("email");
    onEditProfile({ name, email });
  };

  useEffect(() => {}, [onEditProfile]);

  return (
    <>
      <Header />
      <Form
        name="profile"
        title={`Привет, "Имя пользователя"!`}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        btnText="Редактировать"
        isValid={isValid}
      >
        <label className="profile__label">
          <p className="profile__input-name">Имя</p>
          <input
            className="profile__input"
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
          <span className="profile__input-error profile__input-error_active">
            {errors?.name?.message}
          </span>
        </label>
        <label className="profile__label">
          <p className="profile__input-name">E-mail</p>
          <input
            className="profile__input"
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
          <span className="profile__input-error profile__input-error_active">
            {errors?.email && errors?.email?.message}
          </span>
        </label>
      </Form>
    </>
  );
}

export default Profile;
