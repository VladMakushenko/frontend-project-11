import loadRss from './loadRss.js';

const checkForUpdates = (state, i18nextInstance, delay = 5000) => {
  // if (state.feeds.length === 0) return;
  console.warn(state);

  const getUniquePosts = (url) => loadRss(url, state, i18nextInstance)
    .then(({ posts }) => {
      const titles = state.posts.map((post) => post.title);
      return posts.filter((post) => !titles.includes(post.title));
    })
    .catch((error) => {
      throw new Error(error);
    });

  if (state.feeds.length > 0) {
    state.urls.forEach((url) => {
      getUniquePosts(url).then((posts) => {
        // state.posts.push(...posts);
        [].concat(state.posts, posts);
      });
    });
  }

  setTimeout(() => checkForUpdates(state, i18nextInstance, delay), delay);
};

export default checkForUpdates;
