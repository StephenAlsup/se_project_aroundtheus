class Api {
    constructor({ baseUrl, authToken }) {
      this._baseUrl = baseUrl;
      this._authToken = authToken;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject('Error: ${res.status}');
        }
    }

    getInitialCards() {
        return fetch('${this._baseUrl}/cards', {
            headers: {
                authorization: this._authToken,
            },
        }).then(this._checkResponse);
    }
 getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._authToken,
        },
      }).then(this._checkResponse);
    }
 
    editUserInfo(info) {
        console.log(info);
        return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: {
            authorization: this._authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: info.title,
            about: info.about,
          }),
        }).then(this._checkResponse);
      }

editUserAvatar(info) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: this._authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: info.avatar,
        }),
      }).then(this._checkResponse);
    }

addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: this._authToken,
          "Content-Type": "application/json",
        },
      }).then(this._checkResponse);
    }
    addCardLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: "PUT",
          headers: {
            authorization: this._authToken,
            "Content-Type": "application/json",
          },
        }).then(this._checkResponse);
      }
    
      removeCardLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: "DELETE",
          headers: {
            authorization: this._authToken,
            "Content-Type": "application/json",
          },
        }).then(this._checkResponse);
      }
    }
    
    export default Api;
