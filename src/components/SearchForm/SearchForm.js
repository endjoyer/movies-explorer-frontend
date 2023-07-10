import { useEffect, useState } from "react";
import Checkbox from "./Сheckbox/Сheckbox";
import { getMovies } from "../../utils/MoviesApi";

function SearchForm() {
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    getMovies()
      .then((movies) => {
        const filteredMovies = filterMovies(movies, searchInput, isShortFilms);

        if (filteredMovies.length === 0) {
          setSearchError("Ничего не найдено.");
        } else {
          setSearchError("");
          console.log(filteredMovies);
          localStorage.setItem("movies", JSON.stringify(filteredMovies));
        }
      })
      .catch((err) => {
        setSearchError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
      });
  };

  const filterMovies = (movies, keyword, isShortFilms) => {
    const filteredMovies = movies.filter((movie) => {
      const titleRu = movie.nameRU.toLowerCase();
      const titleEn = movie.nameEN.toLowerCase();
      const description = movie.description.toLowerCase();
      const keywordLower = keyword.toLowerCase();

      if (isShortFilms) {
        return (
          titleRu.includes(keywordLower) ||
          titleEn.includes(keywordLower) ||
          description.includes(keywordLower)
        );
      } else {
        return (
          (titleRu.includes(keywordLower) ||
            titleEn.includes(keywordLower) ||
            description.includes(keywordLower)) &&
          movie.duration > 40
        );
      }
    });

    return filteredMovies;
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
