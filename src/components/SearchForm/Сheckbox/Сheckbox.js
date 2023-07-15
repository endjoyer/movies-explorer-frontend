import React from "react";

function Сheckbox({ onCheckbox, isShortFilms }) {
  const handleChange = (event) => {
    onCheckbox(event.target.checked);
  };

  return (
    <label className="checkbox">
      <input type="checkbox" onChange={handleChange} checked={isShortFilms} />
      <span className="checkbox__checkmark"></span>
      <span className="checkbox__body">Короткометражки</span>
    </label>
  );
}

export default Сheckbox;
