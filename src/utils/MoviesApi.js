export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies/";

function requestResult(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`${res.status}`);
}

export const getMovies = async () => {
  const res = await fetch(`${BASE_URL}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return requestResult(res);
};
