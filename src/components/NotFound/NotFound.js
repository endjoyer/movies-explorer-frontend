import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button onClick={() => navigate(-1)} className="not-found__back">
        Назад
      </button>
    </main>
  );
}

export default NotFound;
