import React, { FC } from 'react';
import { User } from 'src/frontend/module/user';
import { formatUpdateDate } from '../../../../utils/function';
import { FavoriteButton, UserIcon } from '../..';
import { ReadOnlyEditor } from '../../../../utils/richtext';
import { getId } from 'src/config/objectId';
import { Summary } from 'src/frontend/module/summary';
type Props = {
  summary: Summary;
  currentUser: User;
};

const SummaryDetails: FC<Props> = (props) => {
  const { summary, currentUser } = props;
  const { title, content, category, subCategory, bookName, updatedAt, user } =
    summary;

  return (
    <>
      <div className="prof-area">
        <UserIcon user={user} />
        <div className="_update-date">
          <p>{formatUpdateDate(updatedAt)}に更新</p>
        </div>
      </div>
      <div className="summary-show">
        <div className="_header">
          <h1 className="main-title blue-main-title">{title}</h1>
          <dl className="_show-book-name">
            <dt>参考本:</dt>
            <dd>{bookName}</dd>
          </dl>
          <div className="tags">
            {/* TODO リンク：カテゴリー記事に飛ばす */}
            <span className="tag">{category.name}</span>
            {subCategory.name && (
              <span className="tag">{subCategory.name}</span>
            )}
          </div>
        </div>
        <div className="_body">
          <ReadOnlyEditor editorState={content} />
          <div className="_favorite-area">
            <FavoriteButton userId={getId(currentUser)} summary={summary} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryDetails;
