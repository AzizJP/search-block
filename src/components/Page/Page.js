import { Validator } from '../../Validator/Validator';
import { Api } from '../Api/Api';
import { List } from '../List/List';
import { Repository } from '../Repository/Repository';
import { Search } from '../Search/Search';
import {
  formSelectors,
  listSelectors,
  repositorySelectors,
  templateSelectors,
} from './Page.constants';

const api = new Api('https://api.github.com/search/repositories');

const validator = new Validator(formSelectors.formSelector, formSelectors.inputSelector);

const searchRepositoties = name => {
  const isValid = validator.enableValidation();
  if (isValid) {
    handleRequestingChange(true);
    api
      .getRepositoryByName(name)
      .then(res => {
        renderRepositories(res.items);
      })
      .catch(err => {
        handleRequestingChange(false);
        console.log(err);
      })
      .finally(() => {
        handleRequestingChange(false);
      });
  }
};

const handleRequestingChange = value => {
  if (value) {
    document.querySelector(`.${formSelectors.buttonSelector}`).textContent = 'Ищем';
  } else {
    document.querySelector(`.${formSelectors.buttonSelector}`).textContent = 'Поиск';
  }
};

const generateRepository = item => {
  const repository = new Repository(templateSelectors.templateId, templateSelectors.cloneSelector);
  return repository.generateRepository(item, repositorySelectors);
};

const list = new List({ renderer: generateRepository }, listSelectors);

const renderRepositories = items => {
  return list.renderItems(items);
};

new Search(searchRepositoties).setEventListeners();
