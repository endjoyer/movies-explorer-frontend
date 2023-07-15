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
import Preloader from "../Preloader/Preloader";

function App() {
  const userId = localStorage.getItem("userId");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
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
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          localStorage.removeItem("userId");
          setIsLoading(false);
        });
    }
  }, [navigate, userId]);

  function handleSignOut() {
    localStorage.clear();
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
                <ProtectedRouteElement
                  element={Movies}
                  userId={userId}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  userId={userId}
                  setIsLoading={setIsLoading}
                />
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
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/signin"
              element={<Login setIsLoading={setIsLoading} />}
            />
            <Route
              path="/signup"
              element={<Register setIsLoading={setIsLoading} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Preloader isLoading={isLoading} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
