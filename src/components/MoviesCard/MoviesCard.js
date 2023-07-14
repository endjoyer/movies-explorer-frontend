// import { useContext } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { useLocation } from "react-router-dom";

function MoviesCard({
  card,
  setMovieToSave,
  onSaveMovies,
  onCardDelete,
  savedMovies,
}) {
  //   const isOwn = card.owner === currentUserId;
  const location = useLocation();

  const isMoviesRoute = location.pathname === "/movies";
  // console.log(savedMovies);
  // console.log(card.id);
  const isSaved = isMoviesRoute
    ? Array.isArray(savedMovies)
      ? savedMovies.some((savedMovie) => savedMovie.movieId === card.id)
      : savedMovies.movieId === card.id
    : false;

  function handleSaveClick() {
    setMovieToSave(card);
    console.log(card.id);
    onSaveMovies(card);
  }
  // function handleCardClick() {
  //   // onCardClick(card);
  // }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__text">
        <p className="movies-card__name">{card.nameRU}</p>
        <span className="movies-card__time">{card.duration} минут</span>
      </div>
      <div className="movies-card__image-container">
        <a
          href={card.trailerLink}
          target="_blank"
          rel="noreferrer"
          className="movies-card__link"
        >
          <img
            className="movies-card__image"
            alt={card.nameRU}
            src={`${
              isMoviesRoute
                ? `https://api.nomoreparties.co${card.image.url}`
                : card.image
            }`}
          />
        </a>
      </div>
      <div className="movies-card__button-container">
        {isMoviesRoute ? (
          <button
            className={`movies-card__button ${
              isSaved ? "movies-card__button_active" : ""
            }`}
            onClick={handleSaveClick}
            aria-label="Сохранить"
            type="button"
          >
            {isSaved ? "" : "Сохранить"}
          </button>
        ) : (
          <button
            className={`movies-card__button movies-card__button_delete`}
            onClick={handleDeleteClick}
            aria-label="Удалить"
            type="button"
          />
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
