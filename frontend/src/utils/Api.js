class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

getHeaders() {
    const token = localStorage.getItem("jwt");
    return {
      ...this.headers,
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.getHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado: ", err);
      });
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.getHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado: ", err);
      });
  }

  editUser({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado: ", err);
      });
  }

  editAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        avatar
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado: ", err);
      });
  }

  createCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado: ", err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado: ", err);
      });
  }

  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.getHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado: ", err);
      });
  }

  dislikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log("Error. La solicitud ha fallado: ", err);
      });
  }

  toggleLike(cardId, isliked) {
    return isliked ? this.dislikeCard(cardId) : this.likeCard(cardId);
  }
}


const api = new Api({
  baseUrl: "http://luisadev.lat"
});

export default api;

  
