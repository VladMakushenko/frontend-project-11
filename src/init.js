import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import locale from './locales/yup.js';
import watchState from './watcher.js';
import loadRss from './rss/loadRss.js';
import checkForUpdates from './rss/checkForUpdates.js';

export default () => {
  const defaultLanguage = 'ru';

  const state = {
    form: {
      value: '',
      error: '',
    },
    urls: [],
    feeds: [],
    posts: [],
    language: defaultLanguage,
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

  const i18Elements = {
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

  checkForUpdates(watchedState, i18nextInstance);

  const applyTranslations = () => {
    Object.keys(i18Elements).forEach((el) => {
      i18Elements[el].textContent = i18nextInstance.t(el);
    });
  };

  applyTranslations();

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

  elements.form.addEventListener('submit', (e) => handleFormSubmit(e));
};
