import Fuse from "fuse.js";

const MIN_CHAR_LENGTH = 2;

const options = {
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true,
  ignoreFieldNorm: true,
  threshold: 0.3,
  minMatchCharLength: MIN_CHAR_LENGTH,
  keys: ["title", "description", "url", "author", "tags", "group"],
};

const tagSearchOptions = {
  ...options,
  minMatchCharLength: 1,
  keys: ["tags"],
};

export function handleSearch<T extends any[]>(items: T, query: string): T {
  if (query === "" || query.length <= MIN_CHAR_LENGTH) return items;
  const myIndex = Fuse.createIndex(options.keys, items);
  const fuse = new Fuse(items, options, myIndex);

  const filteredItems = fuse.search(query);
  return filteredItems.map((r) => r.item) as T;
}

export function handleTagsSearch<T extends any[]>(items: T, tag: string): T {
  const myIndex = Fuse.createIndex(tagSearchOptions.keys, items);
  const fuse = new Fuse(items, tagSearchOptions, myIndex);
  const filteredItems = fuse.search(tag);
  return filteredItems.map((r) => r.item) as T;
}
