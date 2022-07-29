import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ResultResponseList, ResFavorite, ResUser } from '../../../types';
import { MypageSidebar, MypageSummaryStackItem, Pager } from '../..';
import {
  getMyFavorites,
  getfavoriteNum,
  readQuery,
} from '../../../firebase/functions';
import { load as loadUser } from 'src/frontend/module/user';

const MypageFavorites = () => {
  const [user, setUser] = useState<ResUser>({});
  const [favorites, setFavorites] = useState<ResFavorite[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<'id'>();
  const [page, setPage] = useState(Number(readQuery('pages') || 1));
  const [myFavoritesNum, setMyFavoritesNum] = useState(0);
  const [dataNumPerPage, setDataNumPerPager] = useState(8);

  const fetchPager = (num: number) => {
    setPage(num);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const user = await loadUser(id);
        setUser(user);
        const resMyFavoritesDataList: ResultResponseList<ResFavorite> =
          await getMyFavorites(dataNumPerPage, page, id);
        const resMyFavoritesCount: number = await getfavoriteNum([
          'user_id',
          id,
        ]);
        setMyFavoritesNum(resMyFavoritesCount);
        if (resMyFavoritesDataList && resMyFavoritesDataList.status === 200) {
          setFavorites(resMyFavoritesDataList.data);
        }
      } catch (e) {}
    };

    loadData();
  }, [page, id]);

  return (
    <>
      {loading && (
        <div className="mypage_main">
          <div className="l-container">
            <div className="main-block _block-center">
              <div className="user-mypage">
                <h1 className="main-title blue-main-title">MY PAGE</h1>
                <div className="mypage-content">
                  <MypageSidebar user={user} />
                  <div className="_mypage">
                    <h2 className="sub-ttl">いいねした記事一覧</h2>
                    {favorites &&
                      favorites.length > 0 &&
                      favorites.map((favorite: ResFavorite) => {
                        return (
                          <MypageSummaryStackItem data={favorite.summary_id} />
                        );
                      })}
                    <Pager
                      fetchPager={fetchPager}
                      dataNum={myFavoritesNum}
                      dataNumPerPage={dataNumPerPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MypageFavorites;
