import React from "react";
import Checkbox from "./Сheckbox/Сheckbox";
function SearchForm() {
  return (
    <section className="search">
      <label class="search__label">
        <input type="text" placeholder="Фильм" class="search__input" />
        <button type="submit" class="search__button">
          Найти
        </button>
      </label>
      <div className="search__checkbox-container">
        <Checkbox />
      </div>
    </section>
  );
}

export default SearchForm;
