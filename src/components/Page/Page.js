import { Api } from '../Api/Api';
import { List } from '../List/List';
import { Repository } from '../Repository/Repository';
import { Search } from '../Search/Search';

const api = new Api('https://api.github.com/search/repositories');

const searchRepositoties = name => {
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
};

const handleRequestingChange = value => {
  if (value) {
    document.querySelector('.search__button').textContent = 'Ищем...';
  } else {
    document.querySelector('.search__button').textContent = 'Поиск';
  }
};

const generateRepository = item => {
  const repository = new Repository();
  return repository.generateRepository(item);
};

const list = new List({ renderer: generateRepository });

const renderRepositories = items => {
  console.log(items);
  return list.renderItems(items);
};

new Search(searchRepositoties).setEventListeners();
