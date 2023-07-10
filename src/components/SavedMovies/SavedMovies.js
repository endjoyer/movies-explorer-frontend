import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function SavedMovies() {
  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
