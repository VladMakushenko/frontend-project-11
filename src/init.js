import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import locale from './locales/yup.js';
import watchState from './watcher.js';
import loadRss from './rss/loadRss.js';
import checkForUpdates from './rss/checkForUpdates.js';

export default () => {
  const state = {
    form: {
      value: '',
      error: '',
    },
    urls: [],
    feeds: [],
    posts: [],
    language: 'ru',
  };

  const elements = {
    form: document.querySelector('[data-form]'),
    input: document.querySelector('[data-input]'),
    feedback: document.querySelector('[data-feedback]'),
    posts: document.querySelector('[data-posts]'),
    feeds: document.querySelector('[data-feeds]'),
    modal: document.querySelector('[data-modal]'),
    modalTitle: document.querySelector('[data-modal-title]'),
    modalBody: document.querySelector('[data-modal-body]'),
    modalReadMore: document.querySelector('[data-modal-read-full]'),
    modalClose: document.querySelector('[data-modal-close]'),
  };

  const texts = {
    heading: document.querySelector('[data-heading]'),
    subheading: document.querySelector('[data-subheading]'),
    RSSLink: document.querySelector('[data-label]'),
    modalReadMore: document.querySelector('[data-modal-read-full]'),
    modalClose: document.querySelector('[data-modal-close]'),
    addBtn: document.querySelector('[data-submit]'),
    example: document.querySelector('[data-example]'),
  };

  const i18nextInstance = i18n.createInstance();
  i18nextInstance.init({
    lng: state.language,
    resources,
  });

  const watchedState = watchState(state, elements, i18nextInstance);
  console.warn(watchedState);

  checkForUpdates(watchedState, i18nextInstance);

  // const applyTranslations = () => {
  //   Object.keys(texts).forEach((nodeName) => {
  //     texts[nodeName].textContent = i18nextInstance.t(nodeName);
  //   });
  // };

  // applyTranslations();

  yup.setLocale(locale);
  const schema = yup.string().url().required();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    watchedState.form.value = elements.input.value.trim();

    schema
      .notOneOf(watchedState.urls)
      .validate(watchedState.form.value)
      .then((url) => {
        watchedState.urls.push(url);

        return loadRss(watchedState.form.value, watchedState, i18nextInstance)
          .then(({ posts, feed }) => {
            watchedState.posts.push(...posts);
            watchedState.feeds.push(feed);
            watchedState.form.error = null;

            elements.form.reset();
            elements.input.focus();
          });
      })
      .catch(({ errors }) => {
        const keys = errors.map(({ key }) => i18nextInstance.t(`errors.${key}`));
        [watchedState.form.error] = keys;
      });
  };

  // const handleInputTyping = (e) => {
  //   e.target.setCustomValidity('');
  // };

  // const handleInputValidation = (e) => {
  //   if (e.target.value.length === 0) {
  //     e.target.setCustomValidity(i18nextInstance.t('errors.required'));
  //   }
  // };

  elements.form.addEventListener('submit', (e) => handleFormSubmit(e));
  // elements.input.addEventListener('input', (e) => handleInputTyping(e));
  // elements.input.addEventListener('invalid', (e) => handleInputValidation(e));
};
