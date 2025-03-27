const api = {
  getRss: (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`,
};

export default api;
