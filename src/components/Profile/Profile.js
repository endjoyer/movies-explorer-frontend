import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form.js";
import Header from "../Header/Header.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { editUserInfo } from "../../utils/MainApi.js";

function Profile({ onExit, isLoading, setCurrentUser }) {
  const { name: contextName, email: contextEmail } =
    useContext(CurrentUserContext);
  const [name, setName] = useState(contextName);
  const [email, setEmail] = useState(contextEmail);
  const [isFormValid, setIsFormValid] = useState(false);
  const [resServerError, setResServerError] = useState("");

  const {
    register,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const watchAll = watch();

  useEffect(() => {
    setIsFormValid(Object.keys(watchAll).some((key) => watchAll[key] !== ""));
  }, [watchAll]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newName = getValues("name") !== "" ? getValues("name") : contextName;
    const newEmail =
      getValues("email") !== "" ? getValues("email") : contextEmail;
    editUserInfo(newName, newEmail)
      .then((data) => {
        setResServerError("");
        setCurrentUser(data);
        setName(data.name);
        setEmail(data.email);
      })
      .catch((err) => {
        setResServerError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или введенный E-mail не подходит."
        );
        console.log(`Ошибка: ${err}`);
      });
  };

  useEffect(() => {
    setName(contextName);
    setEmail(contextEmail);
  }, [contextName, contextEmail]);

  return (
    <>
      <Header />
      <main className="profile">
        <Form
          name="profile"
          title={`Привет, ${name}!`}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          btnText="Редактировать"
          isValid={isFormValid}
          onExit={onExit}
        >
          <label className="profile__label">
            <span className="profile__input-name">Имя</span>
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
              defaultValue={name}
            />
            <span className="profile__input-error profile__input-error_active">
              {errors?.name?.message}
            </span>
          </label>
          <label className="profile__label">
            <span className="profile__input-name">E-mail</span>
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
              defaultValue={email}
            />
            <span className="profile__input-error profile__input-error_active">
              {(errors?.email && errors?.email?.message) || resServerError}
            </span>
          </label>
        </Form>
      </main>
    </>
  );
}

export default Profile;
