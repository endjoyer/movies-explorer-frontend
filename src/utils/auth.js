export const BASE_URL = "https://api.endjoys.project.nomoredomains.rocks";

function requestResult(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`${res.status}`);
}

export const register = async (password, email) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
  return requestResult(res);
};

export const authorize = async (password, email) => {
  const res = await fetch(`${BASE_URL}/signin`, {
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
  const res = await fetch(`${BASE_URL}/users/me`, {
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
  const res = await fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: "include",
  });
  return requestResult(res);
};
