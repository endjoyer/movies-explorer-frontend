import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import filterMovies from "../../utils/filterMovies.js";
import { deleteSaveMovies, getSaveMovies } from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function SavedMovies() {
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");
  const [visibleCards, setVisibleCards] = useState([]);
  const { _id: userId } = useContext(CurrentUserContext);
  console.log(userId);

  useEffect(() => {
    const localSaveMovies = localStorage.getItem("filteredSaveMovies");
    const movies = localSaveMovies ? JSON.parse(localSaveMovies) : [];
    const userMovies =
      userId && movies.filter((movie) => movie.owner === userId);
    setVisibleCards(userMovies);
  }, [userId]);

  const handleSearchMovies = () => {
    getSaveMovies()
      .then((movies) => {
        const userMovies =
          userId && movies.filter((movie) => movie.owner === userId);
        const filteredMovies = filterMovies(
          userMovies,
          searchInput,
          isShortFilms
        );
        console.log(movies);

        if (filteredMovies.length === 0) {
          setSearchError("Ничего не найдено.");
        } else {
          setSearchError("");
          setVisibleCards(filteredMovies);
        }
      })
      .catch((err) => {
        setSearchError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
      });
  };

  const handleDeleteMovies = (movieToDelete) => {
    console.log(movieToDelete);
    const updatedMovies = visibleCards.filter(
      (item) => item._id !== movieToDelete._id
    );

    setVisibleCards(updatedMovies);
    localStorage.setItem("filteredSaveMovies", JSON.stringify(updatedMovies));

    deleteSaveMovies(movieToDelete._id).catch((err) => {
      console.log(`Ошибка: ${err}`);
      setVisibleCards(visibleCards);
      localStorage.setItem("filteredSaveMovies", JSON.stringify(visibleCards));
    });
  };

  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm
          onSearchMovies={handleSearchMovies}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchError={searchError}
          setIsShortFilms={setIsShortFilms}
        />
        <MoviesCardList
          visibleCards={visibleCards}
          onCardDelete={handleDeleteMovies}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
