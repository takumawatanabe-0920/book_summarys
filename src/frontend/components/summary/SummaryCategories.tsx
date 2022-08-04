import React, { FC } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
// components
import { Link } from 'react-router-dom';
import { categories } from 'src/config/data/category';
type Props = {
  fetchData: any;
};

const SummaryCategories: FC<Props> = (props) => {
  const { fetchData } = props;

  const updateData = (slug: string, name: string): void => {
    fetchData(slug, name);
  };

  return (
    <>
      <div className="summary-category">
        <h2 className="_ttl">カテゴリーで選ぶ</h2>
        <div className="_category-body">
          {categories.map((category) => {
            return (
              <LazyLoadComponent>
                <Link
                  style={{
                    background: `url(${category.image}) no-repeat center center`,
                    backgroundSize: 'cover',
                  }}
                  onClick={() => updateData(category.id, category.name)}
                  to={`/summary?category=${category.id}`}
                  className="_data"
                >
                  <p className="_data-tag">{category.name}</p>
                </Link>
              </LazyLoadComponent>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SummaryCategories;
