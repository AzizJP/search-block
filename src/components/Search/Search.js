export class Search {
  constructor(submitCallback, renderRepositories, repositories) {
    this._submitCallback = submitCallback;
    this._renderRepositories = renderRepositories;
    this._repositories = repositories;
  }

  _getInputValues = () => {
    let value = '';
    const inputElement = this._formElement.querySelector('.search__field');
    console.log(inputElement);
    value = inputElement.value;

    return value;
  };

  _handleSubmit = evt => {
    evt.preventDefault();

    this._submitCallback(this._getInputValues());
  };

  setEventListeners = () => {
    this._formElement = document.querySelector('.search__form');

    this._formElement.addEventListener('submit', this._handleSubmit);
  };
}
