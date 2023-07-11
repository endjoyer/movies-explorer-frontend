import { useEffect, useState } from "react";
import Checkbox from "./Сheckbox/Сheckbox";

function SearchForm({
  onSearchMovies,
  searchInput,
  setSearchInput,
  searchError,
  setIsShortFilms,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchMovies();
  };

  return (
    <section className="search">
      <form className="search__form">
        <input
          type="text"
          placeholder="Фильм"
          className="search__input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSubmit} type="submit" className="search__button">
          Найти
        </button>
        <span className="search__input-error">{searchError}</span>
      </form>
      <div className="search__checkbox-container">
        <Checkbox onCheckbox={setIsShortFilms} />
      </div>
    </section>
  );
}

export default SearchForm;
