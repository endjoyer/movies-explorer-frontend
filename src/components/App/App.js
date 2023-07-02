import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main.js";
// import Movies from "../Movies/Movies.js";
// import SavedMovies from "../SavedMovies/SavedMovies.js";
// import Profile from "../Profile/Profile.js";
// import Login from "../Login/Login.js";
// import Register from "../Register/Register.js";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Aleksey",
    email: "test@test.ru",
    loggeIn: false,
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__container">
          <Routes>
            <Route path="/" element={<Main />} />

            {/* <Route path="/movies" element={<Movies />} />
  
            <Route path="/saved-movies" element={<SavedMovies />} />
  
            <Route path="/profile" element={<Profile />} />
  
            <Route path="/signin" element={<Login />} />
  
            <Route path="/signup" element={<Register />} /> */}
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
