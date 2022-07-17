import React, { useEffect, useState, FC, useContext } from 'react';
import {
  ResFavorite,
  ResultResponseList,
  ResultResponse,
  ResSummaryBook,
} from '../../../types';
import {
  getFavorite,
  createFavorite,
  deleteFavorite,
  updateFavoriteSummaries,
  createNotification,
} from '../../../firebase/functions';
import useAlertState from '../../../assets/hooks/useAlertState';
import { FavoriteIcon } from '../../../utils/material';
import { GlobalContext } from '../../../assets/hooks/context/Global';

type Props = {
  summary_book: ResSummaryBook;
  user_id: string;
};

const FavoliteButton: FC<Props> = (props) => {
  const { user_id, summary_book } = props;
  const [currentUserfavorites, setCurrentUserFavorites] = useState<ResFavorite>(
    {},
  );
  const [favoritesNum, setFavoritesNum] = useState(0);
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);
  const { currentUser, setCurrentUser } = useContext(GlobalContext);

  const handleFavorite = async (event: React.MouseEvent<HTMLElement>) => {
    event.persist();
    event.preventDefault();
    if (!user_id) {
      return await throwAlert('danger', 'ログインしてください。');
    }
    if (Object.keys(summary_book).length <= 0 && !summary_book.id) {
      return await throwAlert('danger', '記事が存在しません。');
    }
    //レンダリングさせる必要がある
    if (Object.keys(currentUserfavorites).length > 0) {
      const resDeleteFavorite: ResultResponse<ResFavorite> =
        await deleteFavorite(currentUserfavorites.id);
      if (resDeleteFavorite && resDeleteFavorite.status === 200) {
        updateFavoriteSummaries(currentUserfavorites.id, summary_book.id);
        setCurrentUserFavorites({});
        setFavoritesNum(favoritesNum - 1);
        await throwAlert('danger', 'いいねを解除しました。');
      } else {
        await throwAlert('danger', 'いいねの解除に失敗しました。');
      }
    } else {
      let newProps = {
        user_name: currentUser.displayName ? currentUser.displayName : '',
        user_id,
        summary_id: summary_book.id,
      };
      const resFavorite: ResultResponse<ResFavorite> = await createFavorite(
        newProps,
      );
      if (resFavorite && resFavorite.status === 200) {
        updateFavoriteSummaries(resFavorite.data.id, summary_book.id);
        setCurrentUserFavorites({ id: resFavorite.data.id, ...props });
        setFavoritesNum(favoritesNum + 1);
        createNotification({
          user_id,
          target_user_id: summary_book.user_id.id,
          user_name: currentUser.displayName ? currentUser.displayName : '',
          target_id: summary_book.id,
          type: 'favorite',
        });
        await throwAlert('success', 'いいねしました。');
      } else {
        await throwAlert('danger', 'いいねに失敗しました。');
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        let resfavoriteList: ResultResponseList<ResFavorite>;
        if (user_id && summary_book.id) {
          resfavoriteList = await getFavorite(user_id, summary_book.id);
        }
        if (
          resfavoriteList &&
          resfavoriteList.status === 200 &&
          resfavoriteList.data.length > 0
        ) {
          setCurrentUserFavorites(resfavoriteList.data[0]);
        }
      } catch (e) {}
    };

    loadData();
  }, []);

  return (
    <>
      <div className="favorite-button" onClick={handleFavorite}>
        {Object.keys(currentUserfavorites).length > 0 ? (
          <FavoriteIcon className="favorite-button isClick" />
        ) : (
          <FavoriteIcon className="favorite-button" />
        )}
      </div>
    </>
  );
};

export default FavoliteButton;
