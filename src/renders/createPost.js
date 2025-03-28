import setModalContent from './setModalContent.js';

const createPost = (post, state, elements, i18nextInstance) => {
  const item = document.createElement('li');
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'bg-transparent', 'border-0', 'gap-2');

  const link = document.createElement('a');
  link.setAttribute('data-id', post.id);
  link.setAttribute('href', post.href);
  link.setAttribute('rel', 'noopener noreferrer');
  link.setAttribute('target', '_blank');
  link.classList.add('fw-bold');
  link.textContent = post.title;

  const button = document.createElement('button');
  button.setAttribute('data-id', post.id);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.textContent = i18nextInstance.t('preview');

  link.addEventListener('click', (e) => {
    const { target } = e;
    const { id } = target.dataset;

    const statePost = state.posts.find((el) => el.id === id);
    statePost.isRead = true;

    link.classList.remove('fw-bold');
    link.classList.add('fw-normal', 'link-secondary');

    // if (post.isRead) {
    //   link.classList.add('fw-normal', 'link-secondary');
    // } else {
    //   link.classList.add('fw-bold');
    // }
  });

  button.addEventListener('click', (e) => {
    const { target } = e;
    const { id } = target.dataset;

    const statePost = state.posts.find((el) => el.id === id);
    statePost.isRead = true;

    link.classList.remove('fw-bold');
    link.classList.add('fw-normal', 'link-secondary');

    // if (post.isRead) {
    //   link.classList.add('fw-normal', 'link-secondary');
    // } else {
    //   link.classList.add('fw-bold');
    // }

    setModalContent(elements, post);
  });

  item.append(link, button);

  return item;
};

export default createPost;
