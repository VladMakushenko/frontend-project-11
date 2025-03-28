/* eslint-disable no-param-reassign */

import createTitleCard from './createTitleCard.js';
import createFeed from './createFeed.js';

const renderFeeds = (watchedState, elements, i18nextInstance) => {
  elements.feeds.innerHTML = '';

  const titleCard = createTitleCard('feeds', i18nextInstance);

  const list = document.createElement('ul');
  list.classList.add('list-group', 'gap-2', 'border-0', 'rounded-0');

  watchedState.feeds.forEach((feed) => {
    const listItem = createFeed(feed);
    list.append(listItem);
  });

  elements.feeds.append(titleCard, list);
};

export default renderFeeds;
