type PaginationOptions = {
  page?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
  limit?: number;
};

function getPaginationQuery(query: any, options: PaginationOptions = {}) {
  let newQuery = query;
  if (options.page > 0) {
    newQuery = newQuery.skip(options.limit * (options.page - 1));
  }
  if (options.sort) {
    newQuery = newQuery.sort({
      [options.sort]: options.direction === 'desc' ? -1 : 1,
    });
  }
  if (options.limit) {
    newQuery = newQuery.limit(options.limit);
  }

  return newQuery;
}

export { getPaginationQuery };
