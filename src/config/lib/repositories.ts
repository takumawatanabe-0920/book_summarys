type PaginationOptions = {
  page?: number;
  perPage?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
  limit?: number;
};

function getPaginationQuery(query: any, options: PaginationOptions = {}) {
  let newQuery = query;
  if (options.page > 0) {
    newQuery = newQuery.skip(options.perPage * (options.page - 1));
  }
  if (options.perPage > 0) {
    newQuery = newQuery.limit(options.perPage);
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

// function getDataSelectQuery<T, K extends Record<string, unknown>>(
//   query: Query<T>,
//   conditions: K,
//   selectFields: string[],
//   populates: string[],
// ) {
//   query.find({
//     ...conditions,
//   });
//   if (selectFields) {
//     query.select(selectFields);
//   }
//   if (populates) {
//     query.populate(populates);
//   }
// }

export { getPaginationQuery };
