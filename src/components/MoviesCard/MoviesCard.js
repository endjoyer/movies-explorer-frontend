// import { useContext } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import plug from "../../images/plug.png";

function MoviesCard({ card, setMovieToSave, onSaveMovies }) {
  //   const { _id: currentUserId } = useContext(CurrentUserContext);
  //   const isSaved = card.likes.some((user) => user === currentUserId);
  const isSaved = false;
  //   const isOwn = card.owner === currentUserId;

  function handleSaveClick() {
    setMovieToSave(card);
    console.log(card.id);
    onSaveMovies();
  }
  // function handleCardClick() {
  //   // onCardClick(card);
  // }
  function handleDeleteClick() {
    // onCardDelete(card);
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
            src={`https://api.nomoreparties.co/${card.image.url}`}
          />
        </a>
      </div>
      <div className="movies-card__button-container">
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
        {false && (
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
