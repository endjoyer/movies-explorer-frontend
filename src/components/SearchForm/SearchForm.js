import React from "react";
import Checkbox from "./Сheckbox/Сheckbox";
function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input type="text" placeholder="Фильм" className="search__input" />
        <button type="submit" className="search__button">
          Найти
        </button>
      </form>
      <div className="search__checkbox-container">
        <Checkbox />
      </div>
    </section>
  );
}

export default SearchForm;
