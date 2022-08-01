import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MypageSidebar, MypageSummaryStackItem, Pager } from '../..';
import { readQuery } from '../../../../firebase/functions';
import { load as loadUser, User } from 'src/frontend/module/user';
import {
  count as countFavorite,
  loadFroUser,
  Favorite,
} from 'src/frontend/module/favorite';
const MypageFavorites = () => {
  const [user, setUser] = useState<Partial<User>>({});
  const [favorites, setFavorites] = useState<Partial<Favorite[]>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<'id'>();
  const [page, setPage] = useState(Number(readQuery('pages') || 1));
  const [myFavoritesNum, setMyFavoritesNum] = useState(0);
  const dataNumPerPage = 8;

  const fetchPager = (num: number) => {
    setPage(num);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const user = await loadUser(id);
        setUser(user);
        const myFavorites = await loadFroUser({
          params: {
            userId: id,
            limit: dataNumPerPage,
            page,
          },
        });
        const myFavoritesCount = await countFavorite({
          params: {
            userId: id,
          },
        });
        setMyFavoritesNum(myFavoritesCount);
        setFavorites(myFavorites);
      } catch (e) {
        console.log(e);
      }
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
                  <MypageSidebar user={user as User} />
                  <div className="_mypage">
                    <h2 className="sub-ttl">いいねした記事一覧</h2>
                    {favorites &&
                      favorites.length > 0 &&
                      favorites.map((favorite) => {
                        return (
                          <MypageSummaryStackItem data={favorite.summary} />
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
