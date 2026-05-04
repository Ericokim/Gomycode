function byField(fieldName) {
  return {
    search(items, query) {
      const value = query.toLowerCase();
      return items.filter((item) => String(item[fieldName]).toLowerCase().includes(value));
    },
  };
}

export const searchStrategies = {
  title: byField("title"),
  author: byField("author"),
  isbn: byField("isbn"),
};
