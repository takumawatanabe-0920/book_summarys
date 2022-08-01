import React, { FC } from 'react';
// components
import { Link } from 'react-router-dom';
import { Category } from 'src/frontend/module/category';

type Props = {
  data: Category;
  fetchData?: any;
};

const CategoryItem: FC<Props> = (props) => {
  const { data } = props;
  const { name, slug } = data;

  return <Link to={`/summary?category=${slug}`}>{name}</Link>;
};

export default CategoryItem;
