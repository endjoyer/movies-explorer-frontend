export default function filterMovies(movies, keyword, isShortFilms) {
  const filteredMovies = movies.filter((movie) => {
    const titleRu = movie.nameRU.toLowerCase();
    const titleEn = movie.nameEN.toLowerCase();
    const description = movie.description.toLowerCase();
    const keywordLower = keyword.toLowerCase();

    if (isShortFilms) {
      return (
        titleRu.includes(keywordLower) ||
        titleEn.includes(keywordLower) ||
        description.includes(keywordLower)
      );
    } else {
      return (
        (titleRu.includes(keywordLower) ||
          titleEn.includes(keywordLower) ||
          description.includes(keywordLower)) &&
        movie.duration > 40
      );
    }
  });

  return filteredMovies;
}
