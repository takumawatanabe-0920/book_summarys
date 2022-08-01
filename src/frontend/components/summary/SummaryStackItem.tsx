import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { formatUpdateDate, formatTagColor } from '../../../utils/function';
// import { UserIcon } from '..';
import { Summary } from 'src/frontend/module/summary';
import { getId } from 'src/config/objectId';

type Props = {
  data: Summary;
};

const SummaryStackItem: FC<Props> = (props) => {
  const { data } = props;

  return (
    <>
      <Link to={`/summary/${getId(data)}`} className="summaries-stack">
        <div className="_stack-header">
          {/* <UserIcon user={data.user} size="min" /> */}
          <p className="_date">
            が{formatUpdateDate(data.updatedAt as any)}に投稿しました。
          </p>
        </div>
        <div className="_txt-box">
          <h3 className="_title">{data.title}</h3>
          <dl className="_book-name">
            <dt>参考本:</dt>
            <dd>{data.bookName}</dd>
          </dl>
          <div className="categories">
            <span
              className={clsx(
                'main-tag',
                data.category.name ? formatTagColor(data.category.name) : '',
              )}
            >
              {data.category && data.category.name}
            </span>
            {data.subCategory && (
              <span className="main-tag sub-tag">{data.subCategory.name}</span>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default SummaryStackItem;
