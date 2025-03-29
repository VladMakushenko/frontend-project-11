import loadRss from './loadRss.js';

const getUniquePosts = (url, state) => loadRss(url, state)
  .then(({ posts }) => {
    const titles = state.posts.map((post) => post.title);
    return posts.filter((post) => !titles.includes(post.title));
  })
  .catch((error) => {
    throw new Error(error);
  });

export default getUniquePosts;
