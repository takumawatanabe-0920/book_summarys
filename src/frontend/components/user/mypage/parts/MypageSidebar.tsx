import React, { useState, useEffect, FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { logout, User } from 'src/frontend/module/user';
import useAlertState from '../../../../hooks/useAlertState';
import { GlobalContext } from '../../../../hooks/context/Global';
import { getId } from 'src/config/objectId';

type Props = {
  user: User;
};

const MypageSidebar: FC<Props> = (props) => {
  const { id } = useParams<'id'>();
  const { user } = props;
  const history = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [isMyAccount, setIsMyAccount] = useState<boolean>(() => {
    return id === getId(currentUser);
  });
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      if (window.confirm('ログアウトしますか？')) {
        await logout();
        setCurrentUser(null);
        await throwAlert('success', 'ログアウトしました。');
        history(`/`, { replace: true });
      }
    } catch (error) {
      await throwAlert('danger', 'ログアウトが失敗しました。');
    }
  };

  const isActive = (_tabType: string) => {
    if (location.pathname.indexOf(_tabType) !== -1) {
      return 'active';
    }
  };

  useEffect(() => {
    setIsMyAccount(id === getId(currentUser));
    setLoading(true);
  }, [id, isMyAccount]);

  return (
    <>
      {loading && user && (
        <>
          <div className="_side-block">
            <Link
              to={`/mypage/${getId(user) || id}/home`}
              className={clsx('_side-item', isActive('home'))}
            >
              ユーザー情報
            </Link>
            {isMyAccount ? (
              <Link
                to={`/mypage/${getId(user) || id}/edit`}
                className={clsx('_side-item', isActive('edit'))}
              >
                会員情報を編集
              </Link>
            ) : (
              ''
            )}
            <Link
              to={`/mypage/${getId(user) || id}/summaries`}
              className={clsx('_side-item', isActive('summaries'))}
            >
              投稿記事
            </Link>
            <Link
              to={`/mypage/${getId(user) || id}/favorites`}
              className={clsx('_side-item', isActive('favorites'))}
            >
              いいね
            </Link>
            {isMyAccount ? (
              <div
                className={clsx('_side-item', isActive('logout'))}
                onClick={() => {
                  handleLogout();
                }}
              >
                ログアウト
              </div>
            ) : (
              ''
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MypageSidebar;
