export class List {
  constructor({ renderer }) {
    this._renderer = renderer;
    this._container = document.querySelector('.list');
  }

  _addRepository = repository => {
    this._container.append(this._renderer(repository));
  };

  renderItems = list => {
    if (list.length === 0) {
      document.querySelector('.list__title').textContent = 'Ничего не найдено';
    } else {
      document.querySelector('.list__title').style.display = 'none';
    }

    list.slice(0, 10).forEach(repository => {
      this._addRepository(repository);
    });
  };
}
