import getUniquePosts from './getUniquePosts.js';

const checkForUpdates = (state, i18nextInstance, delay = 5000) => {
  if (state.feeds.length > 0) {
    state.urls.forEach((url) => {
      getUniquePosts(url, state)
        .then((posts) => {
          [].concat(state.posts, posts);
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  }

  setTimeout(() => checkForUpdates(state, i18nextInstance, delay), delay);
};

export default checkForUpdates;
