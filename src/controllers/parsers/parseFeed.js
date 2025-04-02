import _ from 'lodash';

const parseFeed = (title, description) => ({
  id: _.uniqueId(),
  title,
  description,
});

export default parseFeed;
