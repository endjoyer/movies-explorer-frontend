// import MoviesCard from "../MoviesCard/MoviesCard";

// function MoviesCardList() {
//   // const currentUser = useContext(CurrentUserContext);

//   // const handleEditAvatarClick = () => onEditAvatar(true);
//   // const handleEditProfileClick = () => onEditProfile(true);
//   // const handleAddPlaceClick = () => onAddPlace(true);
//   const filteredMovies = localStorage.getItem("filteredMovies");
//   console.log(filteredMovies);
//   const cardsElements =
//     filteredMovies &&
//     JSON.parse(filteredMovies).map((movie) => (
//       <MoviesCard
//         key={movie.id}
//         card={movie}
//         // onCardDelete={onCardDelete}
//         // onCardClick={onCardClick}
//         // onCardLike={onCardLike}
//       />
//     ));

//   return (
//     <section className="movies-card-list">
//       <ul className="movies-card-list__container">{cardsElements}</ul>
//     </section>
//   );
// }

// export default MoviesCardList;

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ visibleCards, setMovieToSave, onSaveMovies }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {visibleCards.map((movie) => (
          <MoviesCard
            key={movie.id}
            card={movie}
            setMovieToSave={setMovieToSave}
            onSaveMovies={onSaveMovies}
          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
