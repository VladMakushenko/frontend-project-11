/* eslint-disable no-param-reassign */

import onChange from 'on-change';
import renderPosts from './renders/renderPosts.js';
import renderFeeds from './renders/renderFeeds.js';

const watchState = (state, elements, i18nInstance) => {
  const watchedState = onChange(state, (path, error) => {
    switch (path) {
      case 'posts':
        renderPosts(watchedState, elements, i18nInstance);
        break;
      case 'feeds':
        renderFeeds(watchedState, elements, i18nInstance);
        break;
      case 'form.error':
        if (error) {
          elements.input.classList.add('is-invalid');
          elements.feedback.textContent = watchedState.form.error;
          elements.feedback.classList.remove('text-success');
          elements.feedback.classList.add('text-danger');
          break;
        } else {
          elements.input.classList.remove('is-invalid');
          elements.feedback.textContent = i18nInstance.t('successfullyLoaded');
          elements.feedback.classList.remove('text-danger');
          elements.feedback.classList.add('text-success');
          break;
        }
      default:
    }
  });

  return watchedState;
};

export default watchState;
