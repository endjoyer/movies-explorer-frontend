import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form.js";
import Header from "../Header/Header.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { editUserInfo } from "../../utils/MainApi.js";
import Popup from "../Popup/Popup.js";

function Profile({ onExit, setCurrentUser, setIsLoading }) {
  const { name: contextName, email: contextEmail } =
      useContext(CurrentUserContext),
    [resServerError, setResServerError] = useState(""),
    [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    getValues,
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  const [isSameAsContext, setIsSameAsContext] = useState(false);

  const name = watch("name");
  const email = watch("email");

  useEffect(() => {
    if (name === contextName && email === contextEmail) {
      setIsSameAsContext(true);
    } else {
      setIsSameAsContext(false);
    }
  }, [name, email, contextName, contextEmail]);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newName = getValues("name") !== "" ? getValues("name") : contextName;
    const newEmail =
      getValues("email") !== "" ? getValues("email") : contextEmail;
    editUserInfo(newName, newEmail)
      .then((data) => {
        setResServerError("");
        setCurrentUser(data);
        setIsLoading(false);
        setIsPopupOpen(true);
      })
      .catch((err) => {
        setResServerError(
          err === "409"
            ? "Данный E-mail уже используется."
            : "Во время запроса произошла ошибка. Возможно, проблема с соединением или введенный E-mail не подходит."
        );
        console.log(`Ошибка: ${err}`);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (isPopupOpen) {
      const timer = setTimeout(() => {
        setIsPopupOpen(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isPopupOpen]);

  useEffect(() => {
    reset({ name: contextName, email: contextEmail });
  }, [contextName, contextEmail]);

  useEffect(() => {
    setResServerError("");
  }, [isValid]);

  return (
    <>
      <Header />
      <main className="profile">
        <Form
          name="profile"
          title={`Привет, ${contextName ? contextName : ""}!`}
          onSubmit={handleSubmit}
          btnText="Редактировать"
          isValid={isValid && !isSameAsContext}
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
                pattern: {
                  value: /^[A-Za-zа-яА-ЯёЁa -]*$/i,
                  message:
                    "Имя может содержать только латиницу, кириллицу, пробел или дефис",
                },
              })}
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
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Неверный формат электронной почты",
                },
              })}
            />
            <span className="profile__input-error profile__input-error_active">
              {(errors?.email && errors?.email?.message) || resServerError}
            </span>
          </label>
        </Form>
      </main>
      {isPopupOpen && <Popup text="Данные успешно изменены!" />}
    </>
  );
}

export default Profile;
