import Checkbox from "./Сheckbox/Сheckbox";
import { useLocation } from "react-router-dom";

function SearchForm({
  onSearchMovies,
  searchInput,
  setSearchInput,
  searchError,
  setIsShortFilms,
  isShortFilms,
  searchInputSaveMovies,
  setSearchInputSaveMovies,
  setIsShortFilmsSaveMovies,
  isShortFilmsSaveMovies,
}) {
  const location = useLocation();
  const isMoviesRoute = location.pathname === "/movies";

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
          value={isMoviesRoute ? searchInput : searchInputSaveMovies}
          onChange={(e) =>
            isMoviesRoute
              ? setSearchInput(e.target.value)
              : setSearchInputSaveMovies(e.target.value)
          }
        />
        <button onClick={handleSubmit} type="submit" className="search__button">
          Найти
        </button>
        <span className="search__input-error">{searchError}</span>
      </form>
      <div className="search__checkbox-container">
        <Checkbox
          onCheckbox={
            isMoviesRoute ? setIsShortFilms : setIsShortFilmsSaveMovies
          }
          isShortFilms={isMoviesRoute ? isShortFilms : isShortFilmsSaveMovies}
        />
      </div>
    </section>
  );
}

export default SearchForm;
