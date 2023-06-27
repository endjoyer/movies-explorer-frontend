import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardLike, onCardClick, onCardDelete }) {
  const { _id: currentUserId } = useContext(CurrentUserContext);
  const isLiked = card.likes.some((user) => user === currentUserId);
  const isOwn = card.owner === currentUserId;

  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteCardClick() {
    onCardDelete(card._id);
  }

  return (
    <>
      <div className="element__image-container">
        <img
          className="element__image"
          onClick={handleCardClick}
          alt={card.name}
          src={card.link}
        />
      </div>
      {isOwn && (
        <button
          className="element__delete"
          aria-label="Закрыть"
          type="button"
          onClick={handleDeleteCardClick}
        />
      )}
      <div className="element__panel">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={`element__like ${isLiked ? "element__like_active" : ""}`}
            onClick={handleLikeClick}
            aria-label="Поставить лайк"
            type="button"
          ></button>
          <span className="element__number-likes">{card.likes.length}</span>
        </div>
      </div>
    </>
  );
}

export default Card;
