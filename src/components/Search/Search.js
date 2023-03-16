export class Search {
  constructor(submitCallback) {
    this._submitCallback = submitCallback;
  }

  _getInputValues = () => {
    let value = '';
    const inputElement = this._formElement.querySelector('.search__field');
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
