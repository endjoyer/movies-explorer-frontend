import React, { useContext } from "react";
import Card from "../Card.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function Movies({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  return (
    <>
      <Header />
      <main className="movies__content">
        <SearchForm />
        <MoviesCardList />
        <button type="button" className="movies__button">
          Ещё
        </button>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
