import API from "./index";

export const getProductPublisher = (userId) => {
  return fetch(`${API}/user/publisher/${userId}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
