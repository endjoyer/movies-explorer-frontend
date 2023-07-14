import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  visibleCards,
  setMovieToSave,
  onSaveMovies,
  onCardDelete,
  savedMovies,
}) {
  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {Array.isArray(visibleCards) &&
          visibleCards.map((movie, index) => (
            <MoviesCard
              key={`$movie-${index}`}
              card={movie}
              setMovieToSave={setMovieToSave}
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
