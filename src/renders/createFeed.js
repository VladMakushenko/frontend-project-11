const createFeed = (feed) => {
  const item = document.createElement('li');
  item.classList.add('list-group-item', 'bg-transparent', 'border-0');

  const title = document.createElement('h3');
  title.classList.add('h6', 'm-0', 'text-white');
  title.textContent = feed.title;

  const description = document.createElement('p');
  description.classList.add('m-0', 'small', 'text-white-50');
  description.textContent = feed.description;

  item.append(title, description);

  return item;
};

export default createFeed;
