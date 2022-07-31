import React, { useState, useEffect, FC } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
// components
import { Link } from 'react-router-dom';
import {
  loadAll as loadAllCategory,
  Category,
} from 'src/frontend/module/category';
import { getId } from 'src/config/objectId';

type Props = {
  fetchData: any;
};

const SummaryCategories: FC<Props> = (props) => {
  const [categories, setCategories] = useState<Partial<Category[]>>([]);
  const { fetchData } = props;

  const updateData = (slug: string, name: string): void => {
    fetchData(slug, name);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const _category = await loadAllCategory({
          params: {
            sortKey: 'displayOrder',
          },
        });
        setCategories(_category);
      } catch (e) {
        console.error({ e });
      }
    };

    loadData();
  }, []);

  return (
    <>
      <div className="summary-category">
        <h2 className="_ttl">カテゴリーで選ぶ</h2>
        <div className="_category-body">
          {categories.map((data) => {
            return (
              <LazyLoadComponent>
                <Link
                  style={{
                    background: `url(${data.image}) no-repeat center center`,
                    backgroundSize: 'cover',
                  }}
                  onClick={() => updateData(getId(data), data.name)}
                  to={`/summary?category=${getId(data)}`}
                  className="_data"
                >
                  <p className="_data-tag">{data.name}</p>
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
