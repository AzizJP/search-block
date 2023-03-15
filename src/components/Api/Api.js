export class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Accept': 'application/vnd.github+json',
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getRepositoryByName(name) {
    return fetch(
      `${this._url}?q=${name} in:name,description per_page=10`,
      {
        method: 'GET',
        headers: this._headers,
      },
    ).then(this._checkResponse);
  }
}
