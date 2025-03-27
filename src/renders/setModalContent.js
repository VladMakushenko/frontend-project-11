const setModalContent = (elements, post) => {
  const { modalTitle, modalBody, modalReadMore } = elements;
  const { title, description, href } = post;

  modalTitle.textContent = title;
  modalBody.textContent = description;
  modalReadMore.setAttribute('href', href);
};

export default setModalContent;
