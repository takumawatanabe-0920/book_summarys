import React, { FC } from 'react';
import { ResSummaryBook } from '../../../../types';
import { User } from 'src/frontend/module/user';
import { formatUpdateDate } from '../../../../utils/function';
import { FavoriteButton, UserIcon } from '../..';
import { ReadOnlyEditor } from '../../../../utils/richtext';
import { FavoriteIcon } from '../../../../utils/material';
import { getId } from 'src/config/objectId';

type Props = {
  summaryBook: ResSummaryBook;
  currentUser: User;
};

const SummaryDetails: FC<Props> = (props) => {
  const { summaryBook, currentUser } = props;
  const {
    title,
    content,
    favorite_count,
    user_id,
    category,
    sub_category,
    book_name,
    update_date,
  } = summaryBook;

  return (
    <>
      <div className="prof-area">
        {/* <UserIcon user_id={user_id} /> */}
        <div className="_update-date">
          <p>{formatUpdateDate(update_date)}に更新</p>
        </div>
      </div>
      <div className="summary-show">
        <div className="_header">
          <h1 className="main-title blue-main-title">{title}</h1>
          <dl className="_show-book-name">
            <dt>参考本:</dt>
            <dd>{book_name}</dd>
          </dl>
          <div className="tags">
            {/* TODO リンク：カテゴリー記事に飛ばす */}
            <span className="tag">{category.name}</span>
            {sub_category.name && (
              <span className="tag">{sub_category.name}</span>
            )}
          </div>
          <div className="_icons">
            <div className="favorite-area">
              <FavoriteIcon className="favorite-button isClick" />
              <p className="favoriteNum">
                {favorite_count ? favorite_count : 0}
              </p>
            </div>
            {/* TODO: snsボタンを設置 */}
          </div>
        </div>
        <div className="_body">
          <ReadOnlyEditor editorState={content} />
          <div className="_favorite-area">
            <FavoriteButton
              user_id={getId(currentUser)}
              summary_book={summaryBook}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryDetails;
