/* eslint-disable no-param-reassign */

import axios from 'axios';
import api from '../api/api.js';
import parseRss from '../parsers/parseRss.js';
import parseRssInfo from '../parsers/parseRssInfo.js';
import parsePost from '../parsers/parsePost.js';
import parseFeed from '../parsers/parseFeed.js';

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
