import _ from 'lodash';

const parsePost = (post) => {
  const postTitle = post.querySelector('title');
  const postdescription = post.querySelector('description');
  const postLink = post.querySelector('link');

  return {
    id: _.uniqueId(),
    title: postTitle.textContent,
    description: postdescription.textContent,
    href: postLink.textContent,
  };
};

export default parsePost;
