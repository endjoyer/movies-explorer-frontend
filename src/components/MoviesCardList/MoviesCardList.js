import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
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
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
    </section>
  );
}

export default MoviesCardList;
