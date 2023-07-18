import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import filterMovies from "../../utils/filterMovies.js";
import { getMovies } from "../../utils/MoviesApi.js";
import { deleteSaveMovies, saveMovies } from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Movies({ setIsLoading }) {
  const [isShortFilms, setIsShortFilms] = useState(false),
    [searchInput, setSearchInput] = useState(""),
    [searchError, setSearchError] = useState(""),
    [visibleCards, setVisibleCards] = useState([]),
    [cardsPerPage, setCardsPerPage] = useState(0),
    [savedMovies, setSavedMovies] = useState([]),
    { _id: userId } = useContext(CurrentUserContext);

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
    if (userId) {
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
    }
  }, [userId]);

  useEffect(() => {
    const localIsShortFilms = localStorage.getItem("isShortFilms");
    localIsShortFilms && setIsShortFilms(JSON.parse(localIsShortFilms));

    const localSearchInputText = localStorage.getItem("searchInputText");
    localSearchInputText && setSearchInput(JSON.parse(localSearchInputText));

    const filteredMovies = localStorage.getItem("filteredMovies");
    const parsesMovies = filteredMovies ? JSON.parse(filteredMovies) : [];
    console.log(parsesMovies);
    const movies = isShortFilms
      ? parsesMovies
      : parsesMovies.filter((movie) => movie.duration > 40);

    setVisibleCards(movies.slice(0, cardsPerPage));
  }, [cardsPerPage, isShortFilms]);

  const handleToggleShortFilms = () => {
    const newIsShortFilms = !isShortFilms;
    setIsShortFilms(newIsShortFilms);
    localStorage.setItem("isShortFilms", JSON.stringify(newIsShortFilms));
  };

  const handleSearchMovies = () => {
    setIsLoading(true);
    getMovies()
      .then((movies) => {
        const filteredMovies = filterMovies(movies, searchInput, isShortFilms);

        if (filteredMovies.length === 0) {
          setSearchError("Ничего не найдено.");
        } else {
          setSearchError("");

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
      .catch(() => {
        setSearchError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        setIsLoading(false);
      });
  };

  const handleSaveMovies = (movie) => {
    const savedMovie = savedMovies.find((item) => item.movieId === movie.id);
    if (savedMovie) {
      deleteSaveMovies(savedMovie._id)
        .then(() => {
          const newSavedMovies = savedMovies.filter(
            (item) => item._id !== savedMovie._id
          );
          setSavedMovies(newSavedMovies);
          localStorage.setItem("saveMovies", JSON.stringify(newSavedMovies));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      saveMovies(movie)
        .then((res) => {
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
          setIsShortFilms={handleToggleShortFilms}
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
