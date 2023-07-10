export const BASE_URL = "https://api.endjoys.project.nomoredomains.rocks/";

function requestResult(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`${res.status}`);
}

export const getInitialCards = async () => {
  const res = await fetch(`${BASE_URL}cards`, {
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

export const editUser = async (data) => {
  const res = await fetch(`${BASE_URL}users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  });
  return requestResult(res);
};

export const editUserAvatar = async (data) => {
  const res = await fetch(`${BASE_URL}users/me/avatar`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  });
  return requestResult(res);
};

export const postCard = async (data) => {
  const res = await fetch(`${BASE_URL}cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  });
  return requestResult(res);
};

export const deleteCard = async (cardId) => {
  const res = await fetch(`${BASE_URL}cards/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return requestResult(res);
};

export const changeLikeCardStatus = async (cardId, isLiked) => {
  const res = await fetch(`${BASE_URL}cards/${cardId}/likes`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return requestResult(res);
};

export const register = async (password, email) => {
  const res = await fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
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
