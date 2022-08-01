import React, { FC } from 'react';
import clsx from 'clsx';
import { SummaryItem } from '..';
import { Summary } from 'src/frontend/module/summary';
import { getId } from 'src/config/objectId';

type Props = {
  dataList: Summary[];
  articleType?: string;
};

const SummaryList: FC<Props> = (props) => {
  const { dataList, articleType } = props;

  return (
    <div className={clsx('data-list', `${articleType && '_stack-list'}`)}>
      {dataList.map((data) => {
        return (
          <SummaryItem
            key={getId(data)}
            data={data}
            articleType={articleType}
          />
        );
      })}
    </div>
  );
};

export default SummaryList;
