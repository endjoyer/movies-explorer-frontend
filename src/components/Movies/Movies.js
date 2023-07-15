import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import filterMovies from "../../utils/filterMovies.js";
import { getMovies } from "../../utils/MoviesApi.js";
import { saveMovies } from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Movies({ setIsLoading }) {
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState("");
  const [visibleCards, setVisibleCards] = useState([]);
  const [cardsPerPage, setCardsPerPage] = useState(0);
  const [savedMovies, setSavedMovies] = useState([]);
  const { _id: userId } = useContext(CurrentUserContext);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let cardsCount = 0;

      if (screenWidth >= 1070) {
        cardsCount = 3;
      } else if (screenWidth <= 1070) {
        cardsCount = 2;
      } else if (screenWidth <= 622) {
        cardsCount = 5;
      }

      setCardsPerPage(cardsCount);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const localSaveMoviesStr = localStorage.getItem("saveMovies");
    if (localSaveMoviesStr) {
      const localSaveMovies = localSaveMoviesStr
        ? JSON.parse(localSaveMoviesStr)
        : [];

      const userMovies = localSaveMovies.filter(
        (movie) => movie.owner === userId
      );
      setSavedMovies(userMovies);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const localIsShortFilms = localStorage.getItem("isShortFilms");
    localIsShortFilms && setIsShortFilms(JSON.parse(localIsShortFilms));

    const localSearchInputText = localStorage.getItem("searchInputText");
    localSearchInputText && setSearchInput(JSON.parse(localSearchInputText));

    // const localIsShortFilms = localStorage.getItem("isShortFilms");
    // if (localIsShortFilms) {
    //   setIsShortFilms(JSON.parse(localIsShortFilms));
    // }

    // const localSearchInputText = localStorage.getItem("searchInputText");
    // if (localSearchInputText) {
    //   const searchInputText = JSON.parse(localSearchInputText);
    //   setSearchInput(
    //     searchInputText !== null && searchInputText !== undefined
    //       ? searchInputText
    //       : ""
    //   );
    // }

    const filteredMovies = localStorage.getItem("filteredMovies");
    const movies = filteredMovies ? JSON.parse(filteredMovies) : [];

    setVisibleCards(movies.slice(0, cardsPerPage));
    setIsLoading(false);
  }, [cardsPerPage]);

  const handleSearchMovies = () => {
    setIsLoading(true);
    getMovies()
      .then((movies) => {
        const filteredMovies = filterMovies(movies, searchInput, isShortFilms);

        if (filteredMovies.length === 0) {
          setSearchError("Ничего не найдено.");
        } else {
          setSearchError("");
          console.log(filteredMovies);

          setVisibleCards(filteredMovies.slice(0, cardsPerPage));

          localStorage.setItem(
            "filteredMovies",
            JSON.stringify(filteredMovies)
          );
          localStorage.setItem("isShortFilms", JSON.stringify(isShortFilms));
          localStorage.setItem("searchInputText", JSON.stringify(searchInput));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setSearchError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        setIsLoading(false);
      });
  };

  const handleSaveMovies = (movie) => {
    const movieToSave = movie || movieToSave;
    const filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));

    if (filteredMovies) {
      saveMovies(movieToSave)
        .then((res) => {
          console.log(res);
          console.log(movieToSave);
          const newSavedMovies = [...savedMovies, res];
          setSavedMovies(newSavedMovies);
          localStorage.setItem("saveMovies", JSON.stringify(newSavedMovies));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  };

  const handleLoadMore = () => {
    const filteredMovies = localStorage.getItem("filteredMovies");
    const movies = filteredMovies ? JSON.parse(filteredMovies) : [];
    const nextVisibleCards = movies.slice(
      0,
      visibleCards.length + cardsPerPage
    );
    setVisibleCards(nextVisibleCards);
  };

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm
          onSearchMovies={handleSearchMovies}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchError={searchError}
          setIsShortFilms={setIsShortFilms}
          isShortFilms={isShortFilms}
        />
        <MoviesCardList
          visibleCards={visibleCards}
          onSaveMovies={handleSaveMovies}
          savedMovies={savedMovies}
        />
        {localStorage.getItem("filteredMovies") &&
          visibleCards.length <
            JSON.parse(localStorage.getItem("filteredMovies")).length && (
            <button
              type="button"
              className="movies__button"
              onClick={handleLoadMore}
            >
              Ещё
            </button>
          )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
