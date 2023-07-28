// export const BASE_URL = "https://endjoys.diploma.nomoreparties.sbs/";
export const BASE_URL = "http://localhost:3000/";

function requestResult(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`${res.status}`);
}

export const getSaveMovies = async () => {
  const res = await fetch(`${BASE_URL}movies`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return requestResult(res);
};

export const getInitialUser = async () => {
  const res = await fetch(`${BASE_URL}users/me`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return requestResult(res);
};

export const editUserInfo = async (name, email) => {
  const res = await fetch(`${BASE_URL}users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      email,
    }),
  });
  return requestResult(res);
};

export const saveMovies = async (data) => {
  const res = await fetch(`${BASE_URL}movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: `https://api.nomoreparties.co/${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.hash}`,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  });
  return requestResult(res);
};

export const deleteSaveMovies = async (movieId) => {
  const res = await fetch(`${BASE_URL}movies/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return requestResult(res);
};

export const registration = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  });
  return requestResult(res);
};

export const authorize = async (password, email) => {
  const res = await fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ password, email }),
  });

  return requestResult(res).then((data) => {
    if (data) {
      localStorage.setItem("userId", data._id);
      return data;
    }
  });
};

export const checkToken = async () => {
  const res = await fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return requestResult(res);
};

export const getLogoutUser = async () => {
  const res = await fetch(`${BASE_URL}signout`, {
    method: "GET",
    credentials: "include",
  });
  return requestResult(res);
};
