import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  visibleCards,
  onSaveMovies,
  onCardDelete,
  savedMovies,
}) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {Array.isArray(visibleCards) &&
          visibleCards.map((movie, index) => (
            <MoviesCard
              key={`$movie-${index}`}
              card={movie}
              onSaveMovies={onSaveMovies}
              onCardDelete={onCardDelete}
              savedMovies={savedMovies}
            />
          ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
