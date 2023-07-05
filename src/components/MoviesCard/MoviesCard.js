// import { useContext } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import img from "../../images/plug.png";

function MoviesCard({ card, onCardSave, onCardClick, onCardDelete }) {
  //   const { _id: currentUserId } = useContext(CurrentUserContext);
  //   const isSaved = card.likes.some((user) => user === currentUserId);
  const isSaved = false;
  //   const isOwn = card.owner === currentUserId;

  function handleSaveClick() {
    onCardSave(card);
  }

  return (
    <div className="movies-card">
      <div className="movies-card__text">
        <h2 className="movies-card__name">Здесь будет название</h2>
        <p className="movies-card__time">n минут</p>
      </div>
      <div className="movies-card__image-container">
        <img className="movies-card__image" alt="Заглушка" src={img} />
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
          {isSaved ? <div className="movies-card__save-icon" /> : "Сохранить"}
        </button>
      </div>
    </div>
  );
}

export default MoviesCard;
