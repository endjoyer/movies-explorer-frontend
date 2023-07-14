import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import NotFound from "../NotFound/NotFound";
import { checkToken, getLogoutUser } from "../../utils/MainApi";

function App() {
  const userId = localStorage.getItem("userId");
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      checkToken(userId)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
          }
        })
        .then(() => {
          if (
            window.location.pathname === "/signin" ||
            window.location.pathname === "/signup"
          ) {
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          localStorage.removeItem("userId");
        });
    }
  }, [navigate, userId]);

  function handleSignOut() {
    localStorage.removeItem("userId");
    getLogoutUser();
    setCurrentUser({});
    navigate("/signin", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement element={Movies} userId={userId} />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement element={SavedMovies} userId={userId} />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={Profile}
                  setCurrentUser={setCurrentUser}
                  onExit={handleSignOut}
                  userId={userId}
                />
              }
            />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
