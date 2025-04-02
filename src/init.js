/* eslint-disable no-unused-vars */

import Modal from 'bootstrap/js/dist/modal.js';
import * as yup from 'yup';
import i18n from 'i18next';
import state from './models/state.js';
import resources from './locales/index.js';
import locale from './locales/yup.js';
import watchState from './views/watcher.js';
import checkForUpdates from './controllers/rss/checkForUpdates.js';
import handleFormSubmit from './controllers/handlers/handleFormSubmit.js';

export default () => {
  const defaultLanguage = 'ru';
  state.language = defaultLanguage;

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

  const postModal = new Modal(elements.modal);

  elements.form.addEventListener('submit', (e) => handleFormSubmit(e, watchedState, elements, i18nextInstance, schema));
};
