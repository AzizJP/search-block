export class List {
  constructor({ renderer }, { listSelector, titleSelector }) {
    this._renderer = renderer;
    this._listSelector = listSelector;
    this._titleSelector = titleSelector;

    this._container = document.querySelector(`.${this._listSelector}`);
  }

  _addRepository = repository => {
    this._container.append(this._renderer(repository));
  };

  renderItems = list => {
    if (list.length === 0) {
      document.querySelector(`.${this._titleSelector}`).textContent = 'Ничего не найдено';
    } else {
      document.querySelector(`.${this._titleSelector}`).style.display = 'none';
    }

    list.slice(0, 10).forEach(repository => {
      this._addRepository(repository);
    });
  };
}
