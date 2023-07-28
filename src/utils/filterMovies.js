export default function filterMovies(movies, keyword) {
  const filteredMovies = movies.filter((movie) => {
    const titleRu = movie.nameRU.toLowerCase();
    const titleEn = movie.nameEN.toLowerCase();
    const description = movie.description.toLowerCase();
    const keywordLower = keyword.toLowerCase();

    return (
      titleRu.includes(keywordLower) ||
      titleEn.includes(keywordLower) ||
      description.includes(keywordLower)
    );
  });

  return filteredMovies;
}
