/* eslint-disable no-param-reassign */

import loadRss from '../rss/loadRss.js';

const handleFormSubmit = (e, state, elements, i18nextInstance, schema) => {
  e.preventDefault();

  state.form.value = elements.input.value.trim();

  schema
    .notOneOf(state.urls)
    .validate(state.form.value)
    .then((url) => {
      state.urls.push(url);
      return loadRss(state.form.value, state, i18nextInstance);
    })
    .then(({ posts, feed }) => {
      state.posts.push(...posts);
      state.feeds.push(feed);
      state.form.error = null;

      elements.form.reset();
      elements.input.focus();
    })
    .catch(({ errors }) => {
      const keys = errors.map(({ key }) => i18nextInstance.t(`errors.${key}`));
      [state.form.error] = keys;
    });
};

export default handleFormSubmit;
