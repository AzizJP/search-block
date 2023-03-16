export class Validator {
  constructor(formSelector, inputSelector) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
  }

  _showInputError = inputElement => {
    const errorElement = inputElement.nextSibling.nextSibling;
    errorElement.style.display = 'inline';
    errorElement.textContent = inputElement.validationMessage;
  };

  _deleteInputError = inputElement => {
    const errorElement = inputElement.nextSibling.nextSibling;
    errorElement.style.display = 'none';
    errorElement.textContent = '';
  };

  _isValid = element => {
    return element.validity.valid;
  };

  _handleInputEvent = () => {
    this._deleteInputError(this._inputElement);

    this._inputElement.removeEventListener('input', this._handleInputEvent);
  };

  enableValidation = () => {
    this._formElement = document.querySelector(`.${this._formSelector}`);
    this._inputElement = this._formElement.querySelector(`.${this._inputSelector}`);

    if (!this._isValid(this._inputElement)) {
      this._showInputError(this._inputElement);
    }

    this._setEventListeners();

    return this._isValid(this._inputElement);
  };

  _setEventListeners = () => {
    this._inputElement.addEventListener('input', this._handleInputEvent);
  };
}
