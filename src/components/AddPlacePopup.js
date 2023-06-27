import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
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
    const name = getValues("name");
    const link = getValues("link");
    onAddPlace({ name, link });
  };

  useEffect(() => {
    reset();
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        name="add"
        title="Новое место"
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        btnText="Сохранить"
        isValid={isValid}
      >
        <label className="popup__label">
          <input
            className="popup__input"
            type="text"
            placeholder="Название"
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
          <span className="popup__input-error popup__input-error_active">
            {errors?.name?.message}
          </span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input"
            type="url"
            placeholder="Ссылка на картинку"
            {...register("link", {
              required: "Заполните это поле.",
              validate: (v) => v.includes("http"),
            })}
          />
          <span className="popup__input-error popup__input-error_active">
            {errors?.link &&
              (errors?.link?.message || "Введите ссылку на изображение.")}
          </span>
        </label>
      </PopupWithForm>
    </Popup>
  );
};

export default AddPlacePopup;
