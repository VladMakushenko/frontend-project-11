const parseRssInfo = (rss) => {
  const title = rss.querySelector('title');
  const description = rss.querySelector('description');
  const items = [...rss.querySelectorAll('item')];

  if (!title || !description || !items.length) {
    throw new Error('noData');
  }

  return {
    title: title.textContent,
    description: description.textContent,
    items,
  };
};

export default parseRssInfo;
