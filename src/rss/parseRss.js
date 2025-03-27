const parseRss = ({ contents }) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(contents, 'application/xml');

  return parsedData;
};

export default parseRss;
