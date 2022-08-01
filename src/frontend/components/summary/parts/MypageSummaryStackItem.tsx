import React, { useState, useEffect, FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { formatUpdateDate } from '../../../../utils/function';
import { GlobalContext } from '../../../hooks/context/Global';
import { getId } from 'src/config/objectId';
import { Summary } from 'src/frontend/module/summary';

type Props = {
  data: Summary;
  time?: Date;
};

const MypageSummaryStackItem: FC<Props> = (props) => {
  const [summaryThumbnail, setSummaryThumbnail] = useState<string>('');
  const { data, time } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useContext(GlobalContext);

  const formatPublishingStatus = (_status: string) => {
    switch (_status) {
      case 'public':
        return '公開中';
      case 'private':
        return '非公開';
      default:
        return '非公開';
    }
  };

  const formatPublishingStatusClassName = (_status: string) => {
    switch (_status) {
      case 'public':
        return 'green';
      case 'private':
        return 'red';
      default:
        return 'red';
    }
  };

  const isShowElementOnlyCurrentUser = (): boolean => {
    return getId(data.user) === getId(currentUser);
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      {time && (
        <div className="_update-date">
          あなたが{formatUpdateDate(time as any)}
          に閲覧しました。
        </div>
      )}
      <Link to={`/summary/${data.id}`} className="summaries-stack">
        <div className="left-box">
          {loading && summaryThumbnail && (
            <img src={summaryThumbnail} alt={data.title} />
          )}
        </div>
        <div className="right-box">
          {isShowElementOnlyCurrentUser() && (
            <span
              className={clsx(
                'label',
                `${formatPublishingStatusClassName(data.publishingStatus)}`,
              )}
            >
              {formatPublishingStatus(data.publishingStatus)}
            </span>
          )}
          <h3 className="_title">{data.title}</h3>
          {isShowElementOnlyCurrentUser() && (
            <div className="_summary-edit-btn">
              <Link
                to={`/summary/${data.id}/edit`}
                className="_btn _edit _wd-6-btn"
              >
                編集する
              </Link>
            </div>
          )}
          <dl className="_date">
            <dt>投稿日時</dt>
            <dd>
              <p className="_description">
                {formatUpdateDate(data.updatedAt as any)}
              </p>
            </dd>
          </dl>
        </div>
      </Link>
    </>
  );
};

export default MypageSummaryStackItem;
