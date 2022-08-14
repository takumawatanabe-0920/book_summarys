export const categories = [
  {
    id: 'history',
    name: '歴史',
    slug: 'history',
    displayOrder: 10000,
    imageKey: 'categories/history.jpg',
  },
  {
    id: 'novel',
    name: '小説',
    slug: 'novel',
    displayOrder: 99999,
    imageKey: 'categories/novel.jpg',
  },
  {
    id: 'technology',
    name: 'テクノロジー',
    slug: 'technology',
    displayOrder: 99998,
    imageKey: 'categories/technology.jpg',
  },
  {
    id: 'language',
    name: '言語',
    slug: 'language',
    displayOrder: 99997,
    imageKey: 'categories/langage.jpg',
  },
  {
    id: 'manga',
    name: 'マンガ',
    slug: 'manga',
    displayOrder: 99995,
    imageKey: 'categories/manga.jpg',
  },
  {
    id: 'other',
    name: 'その他',
    slug: 'other',
    displayOrder: 100,
    imageKey: 'categories/other.jpg',
  },
] as const;
