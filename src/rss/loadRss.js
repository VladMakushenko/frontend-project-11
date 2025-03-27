import axios from 'axios';
import api from '../api.js';
import parseRss from './parseRss.js';
import parseRssInfo from './parseRssInfo.js';
import parsePost from './parsePost.js';
import parseFeed from './parseFeed.js';

const loadRss = (url, watchedState, i18nextInstance) => axios
  .get(api.getRss(url))
  .then(({ data }) => {
    const { title, description, items } = parseRssInfo(parseRss(data));

    const posts = items.map((post) => parsePost(post));
    const feed = parseFeed(title, description);

    return { posts, feed };
  })
  .catch(({ message }) => {
    watchedState.form.error = i18nextInstance.t(`errors.${message}`);
  });

export default loadRss;
