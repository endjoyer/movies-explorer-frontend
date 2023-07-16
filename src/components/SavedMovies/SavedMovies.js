import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import filterMovies from "../../utils/filterMovies.js";
import { deleteSaveMovies, getSaveMovies } from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function SavedMovies({ setIsLoading }) {
  const [isShortFilmsSaveMovies, setIsShortFilmsSaveMovies] = useState(false);
  const [searchInputSaveMovies, setSearchInputSaveMovies] = useState("");
  const [searchError, setSearchError] = useState("");
  const [visibleCards, setVisibleCards] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const { _id: userId } = useContext(CurrentUserContext);

  useEffect(() => {
    setIsLoading(true);

    getSaveMovies()
      .then((movies) => {
        userId &&
          setUserMovies(movies.filter((movie) => movie.owner === userId));
        localStorage.setItem("saveMovies", JSON.stringify(movies));
      })
      .catch((err) => {
        setSearchError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
      });

    const localIsShortFilms = localStorage.getItem("isShortFilmsSaveMovies");
    localIsShortFilms &&
      setIsShortFilmsSaveMovies(JSON.parse(localIsShortFilms));

    const localSearchInputText = localStorage.getItem(
      "searchInputTextSaveMovies"
    );
    localSearchInputText &&
      setSearchInputSaveMovies(JSON.parse(localSearchInputText));

    const localFilteredSaveMovies = localStorage.getItem("filteredSaveMovies");
    const movies = localFilteredSaveMovies
      ? JSON.parse(localFilteredSaveMovies)
      : [];
    const userMovies =
      userId && movies.filter((movie) => movie.owner === userId);
    setVisibleCards(userMovies);
    setIsLoading(false);
  }, [userId]);

  const handleSearchMovies = () => {
    setIsLoading(true);

    const filteredMovies = filterMovies(
      userMovies,
      searchInputSaveMovies,
      isShortFilmsSaveMovies
    );

    if (filteredMovies.length === 0) {
      setSearchError("Ничего не найдено.");
    } else {
      setSearchError("");
      setVisibleCards(filteredMovies);

      localStorage.setItem(
        "filteredSaveMovies",
        JSON.stringify(filteredMovies)
      );
      localStorage.setItem(
        "isShortFilmsSaveMovies",
        JSON.stringify(isShortFilmsSaveMovies)
      );
      localStorage.setItem(
        "searchInputTextSaveMovies",
        JSON.stringify(searchInputSaveMovies)
      );
    }
    setIsLoading(false);
  };

  const handleDeleteMovies = (movieToDelete) => {
    const updatedMovies = visibleCards.filter(
      (item) => item._id !== movieToDelete._id
    );

    setVisibleCards(updatedMovies);
    localStorage.setItem("filteredSaveMovies", JSON.stringify(updatedMovies));

    const localSaveMovies = JSON.parse(localStorage.getItem("saveMovies"));
    const updatedSaveMovies = localSaveMovies.filter(
      (item) => item._id !== movieToDelete._id
    );
    localStorage.setItem("saveMovies", JSON.stringify(updatedSaveMovies));

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
          searchInputSaveMovies={searchInputSaveMovies}
          setSearchInputSaveMovies={setSearchInputSaveMovies}
          searchError={searchError}
          setIsShortFilmsSaveMovies={setIsShortFilmsSaveMovies}
          isShortFilmsSaveMovies={isShortFilmsSaveMovies}
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
