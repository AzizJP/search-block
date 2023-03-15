import { changeWordEnding } from './Repository.helpers';

export class Repository {
  constructor() {}

  _getRepositoryTemplate = () => {
    const repositoryElement = document
      .querySelector('#list')
      .content.querySelector('.repository')
      .cloneNode(true);
    return repositoryElement;
  };

  _timePassedSince = stringDate => {
    this._initialDate = new Date(stringDate);
    this._dateNow = new Date();
    this._dateDifference = Math.abs(this._dateNow.getTime() - this._initialDate.getTime());
    this._diffDays = Math.ceil(this._dateDifference / (1000 * 3600 * 24));
    this._yearsPassed = Math.floor(this._diffDays / 360);
    this._monthsPassed = Math.floor((this._diffDays % 360) / 30);
    this._daysPassed = (this._diffDays % 360) % 30;

    this._years = changeWordEnding(this._yearsPassed, 'год', 'года', 'лет');
    this._months = changeWordEnding(this._monthsPassed, 'месяц', 'месяца', 'месяцев');
    this._days = changeWordEnding(this._daysPassed, 'день', 'дня', 'дней');

    if (this._yearsPassed === 0 && this._monthsPassed === 0) {
      return `${this._daysPassed} ${this._days} назад`;
    }
    if (this._yearsPassed === 0) {
      return `${this._monthsPassed} ${this._months} ${this._daysPassed} ${this._days} назад`;
    }
    return `${this._yearsPassed} ${this._years} ${this._monthsPassed} ${this._months} ${this._daysPassed} ${this._days} назад`;
  };

  generateRepository = ({ full_name, html_url, created_at, updated_at, owner }) => {
    this._repositoryElement = this._getRepositoryTemplate();
    console.log(this._repositoryElement);
    this._nameElement = this._repositoryElement.querySelector('.repository__name');
    this._createdDateElement = this._repositoryElement.querySelector('#created');
    this._updatedDateElement = this._repositoryElement.querySelector('#updated');
    this._ownerNameElement = this._repositoryElement.querySelector('.repository__owner-name');
    this._ownerAvatarElement = this._repositoryElement.querySelector('.repository__owner-avatar');
    this._ownerTypeElement = this._repositoryElement.querySelector('.repository__owner-type');

    this._nameElement.textContent = full_name;
    this._nameElement.href = html_url;
    this._createdDateElement.textContent = `Создан: ${this._timePassedSince(created_at)}`;
    this._updatedDateElement.textContent = `Обновлён: ${this._timePassedSince(updated_at)}`;

    this._ownerNameElement.textContent = owner.login;
    this._ownerAvatarElement.src = owner.avatar_url;
    this._ownerTypeElement.textContent = owner.type;

    return this._repositoryElement;
  };
}
