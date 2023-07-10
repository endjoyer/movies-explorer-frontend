// import { useContext } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import plug from "../../images/plug.png";

function MoviesCard({ card, onCardSave, onCardClick, onCardDelete }) {
  //   const { _id: currentUserId } = useContext(CurrentUserContext);
  //   const isSaved = card.likes.some((user) => user === currentUserId);
  const isSaved = false;
  //   const isOwn = card.owner === currentUserId;

  function handleSaveClick() {
    onCardSave(card);
  }
  function handleCardClick() {
    onCardClick(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__text">
        <h2 className="movies-card__name">Здесь будет название</h2>
        <p className="movies-card__time">n минут</p>
      </div>
      <div className="movies-card__image-container " onClick={handleCardClick}>
        <img className="movies-card__image" alt="Заглушка" src={plug} />
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
