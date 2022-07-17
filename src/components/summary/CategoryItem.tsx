import React, { useState, FC } from 'react';
// components
import { ResCategory } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  data: ResCategory;
  fetchData?: any;
};

const CategoryItem: FC<Props> = (props) => {
  const [categories, setCategories] = useState<ResCategory[]>([]);
  const { data, fetchData } = props;
  const { id, name, slug } = data;

  return (
    <>
      <Link to={`/summary?category=${slug}`}>{name}</Link>
    </>
  );
};

export default CategoryItem;
