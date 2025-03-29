const parseRssInfo = (rss) => {
  const title = rss.querySelector('title');
  const description = rss.querySelector('description');
  const items = [...rss.querySelectorAll('item')];

  return {
    title: title.textContent,
    description: description.textContent,
    items,
  };
};

export default parseRssInfo;
