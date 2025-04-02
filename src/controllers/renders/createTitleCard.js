const createTitleCard = (name, i18nextInstance) => {
  const card = document.createElement('div');
  card.classList.add('card', 'bg-transparent', 'border-0');

  const body = document.createElement('div');
  body.classList.add('card-body');

  const title = document.createElement('h2');
  title.classList.add('card-title', 'text-white', 'mb-0');
  title.textContent = i18nextInstance.t(name);

  body.append(title);
  card.append(body);

  return card;
};

export default createTitleCard;
