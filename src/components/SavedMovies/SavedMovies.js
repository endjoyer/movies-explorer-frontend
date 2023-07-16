import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import filterMovies from "../../utils/filterMovies.js";
import { deleteSaveMovies, getSaveMovies } from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function SavedMovies({ setIsLoading }) {
  const [isShortFilmsSaveMovies, setIsShortFilmsSaveMovies] = useState(false),
    [searchInputSaveMovies, setSearchInputSaveMovies] = useState(""),
    [searchError, setSearchError] = useState(""),
    [visibleCards, setVisibleCards] = useState([]),
    [userMovies, setUserMovies] = useState([]),
    { _id: userId } = useContext(CurrentUserContext);

  useEffect(() => {
    setIsLoading(true);

    if (userId) {
      setIsLoading(true);
      getSaveMovies()
        .then((movies) => {
          setUserMovies(movies.filter((movie) => movie.owner === userId));
          localStorage.setItem("saveMovies", JSON.stringify(userMovies));
          setIsLoading(false);
        })
        .catch((err) => {
          setSearchError(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
          setIsLoading(false);
        });
    }

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
    const updatedVisibleMovies = visibleCards.filter(
      (item) => item._id !== movieToDelete._id
    );

    setVisibleCards(updatedVisibleMovies);
    localStorage.setItem(
      "filteredSaveMovies",
      JSON.stringify(updatedVisibleMovies)
    );

    const localSaveMovies = JSON.parse(localStorage.getItem("saveMovies"));
    const updatedSaveMovies = localSaveMovies.filter(
      (item) => item._id !== movieToDelete._id
    );
    setUserMovies(updatedSaveMovies);
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
