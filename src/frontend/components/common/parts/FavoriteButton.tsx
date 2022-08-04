import React, { useEffect, useState, FC } from 'react';
import useAlertState from '../../../hooks/useAlertState';
import { FavoriteIcon } from '../../../../utils/material';
import { Summary } from 'src/frontend/module/summary';
import { getId } from 'src/config/objectId';
import {
  loadSummaryFroUser,
  Favorite,
  create as createFavorite,
  remove as deleteFavorite,
} from 'src/frontend/module/favorite';

type Props = {
  summary: Summary;
  userId: string;
};

const FavoliteButton: FC<Props> = (props) => {
  const { userId, summary } = props;
  const [currentUserfavorites, setCurrentUserFavorites] = useState<
    Partial<Favorite>
  >({});
  const [favoritesNum, setFavoritesNum] = useState(0);
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);

  const handleFavorite = async (event: React.MouseEvent<HTMLElement>) => {
    event.persist();
    event.preventDefault();
    if (!userId) {
      return await throwAlert('danger', 'ログインしてください。');
    }
    if (Object.keys(summary).length <= 0 && !getId(summary)) {
      return await throwAlert('danger', '記事が存在しません。');
    }
    //レンダリングさせる必要がある
    if (Object.keys(currentUserfavorites).length > 0) {
      try {
        await deleteFavorite({
          favoriteId: getId(currentUserfavorites),
          summaryId: getId(summary),
        });
        setCurrentUserFavorites({});
        setFavoritesNum(favoritesNum - 1);
        await throwAlert('danger', 'いいねを解除しました。');
      } catch (e) {
        console.error({ e });
        await throwAlert('danger', 'いいねの解除に失敗しました。');
      }
    } else {
      try {
        const _favorite = await createFavorite({
          user: userId,
          summary: getId(summary),
        });
        setCurrentUserFavorites(_favorite || {});
        setFavoritesNum(favoritesNum + 1);
        await throwAlert('success', 'いいねしました。');
      } catch (e) {
        console.error({ e });
        await throwAlert('danger', 'いいねに失敗しました。');
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (userId && getId(summary)) {
          const favorites = await loadSummaryFroUser({
            userId,
            summaryId: getId(summary),
          });
          setCurrentUserFavorites(favorites?.[0] || {});
        }
      } catch (e) {
        console.error({ e });
      }
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
