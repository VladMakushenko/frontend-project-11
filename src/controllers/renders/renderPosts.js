/* eslint-disable no-param-reassign */

import createTitleCard from './createTitleCard.js';
import createPost from './createPost.js';

const renderPosts = (watchedState, elements, i18nextInstance) => {
  elements.posts.innerHTML = '';

  const titleCard = createTitleCard('posts', i18nextInstance);

  const list = document.createElement('ul');
  list.classList.add('list-group', 'gap-2', 'border-0', 'rounded-0');

  watchedState.posts.forEach((post) => {
    const listItem = createPost(post, watchedState, elements, i18nextInstance);
    list.append(listItem);
  });

  elements.posts.append(titleCard, list);
};

export default renderPosts;
