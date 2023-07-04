import React, { useContext } from "react";
import Card from "../Card.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";

function Movies({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  // const currentUser = useContext(CurrentUserContext);

  // const handleEditAvatarClick = () => onEditAvatar(true);
  // const handleEditProfileClick = () => onEditProfile(true);
  // const handleAddPlaceClick = () => onAddPlace(true);

  // const cardsElements = cards.map((card) => (
  //   <li className="element" key={card._id}>
  //     <Card
  //       card={card}
  //       onCardDelete={onCardDelete}
  //       onCardClick={onCardClick}
  //       onCardLike={onCardLike}
  //     />
  //   </li>
  // ));

  return (
    <>
      <Header />
      <main className="movies__content">
        <SearchForm />
      </main>
      <Footer />
    </>

    // <main className="page__content">
    //   <section className="profile">
    //     <div className="profile__avatar-container">
    //       <img
    //         className="profile__avatar"
    //         src={currentUser.avatar}
    //         alt={`Картинка профиля ${currentUser.name}`}
    //       />
    //       <button
    //         className="profile__edit-avatar-button"
    //         aria-label="Открыть редактирование картинки профиля"
    //         type="button"
    //         onClick={handleEditAvatarClick}
    //       ></button>
    //     </div>
    //     <div className="profile__info">
    //       <div className="profile__title-container">
    //         <h1 className="profile__title">{currentUser.name}</h1>
    //         <button
    //           className="profile__edit-button"
    //           aria-label="Открыть редактирование профиля"
    //           type="button"
    //           onClick={handleEditProfileClick}
    //         ></button>
    //       </div>
    //       <p className="profile__subtitle">{currentUser.about}</p>
    //     </div>
    //     <button
    //       className="profile__add-button"
    //       aria-label="Открыть добавление изображений"
    //       type="button"
    //       onClick={handleAddPlaceClick}
    //     ></button>
    //   </section>
    //   <section className="elements">
    //     <ul className="elements__container">{cardsElements}</ul>
    //   </section>
    // </main>
  );
}

export default Movies;
