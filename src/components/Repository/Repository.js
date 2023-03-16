import { changeWordEnding } from './Repository.helpers';

export class Repository {
  constructor(templateId, cloneSelector) {
    this._templateId = templateId;
    this._cloneSelector = cloneSelector;
  }

  _getRepositoryTemplate = () => {
    const repositoryElement = document
      .querySelector(`#${this._templateId}`)
      .content.querySelector(`.${this._cloneSelector}`)
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

  generateRepository = (
    { full_name, html_url, created_at, updated_at, owner },
    {
      nameSelector,
      createdId,
      updatedId,
      ownerSelector,
      ownerNameSelector,
      ownerAvatarSelector,
      ownerTypeSelector,
    },
  ) => {
    this._repositoryElement = this._getRepositoryTemplate();
    this._nameElement = this._repositoryElement.querySelector(`.${nameSelector}`);
    this._createdDateElement = this._repositoryElement.querySelector(`#${createdId}`);
    this._updatedDateElement = this._repositoryElement.querySelector(`#${updatedId}`);
    this._ownerElement = this._repositoryElement.querySelector(`.${ownerSelector}`);
    this._ownerNameElement = this._repositoryElement.querySelector(`.${ownerNameSelector}`);
    this._ownerAvatarElement = this._repositoryElement.querySelector(`.${ownerAvatarSelector}`);
    this._ownerTypeElement = this._repositoryElement.querySelector(`.${ownerTypeSelector}`);

    this._nameElement.textContent = full_name;
    this._nameElement.href = html_url;
    this._createdDateElement.textContent = `Создан: ${this._timePassedSince(created_at)}`;
    this._updatedDateElement.textContent = `Обновлён: ${this._timePassedSince(updated_at)}`;

    this._ownerElement.href = owner.html_url;
    this._ownerNameElement.textContent = owner.login;
    this._ownerAvatarElement.src = owner.avatar_url;
    this._ownerTypeElement.textContent = `${owner.type}:`;

    return this._repositoryElement;
  };
}
