import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'src/frontend/module/user';
import {
  logoIcon,
  editIcon,
  userCircleIcon,
  caretDownIcon,
} from '../../../utils/icons';
import useAlertState from '../../hooks/useAlertState';
import { GlobalContext } from '../../hooks/context/Global';
import { getId } from 'src/config/objectId';

const Header = () => {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const history = useNavigate();
  const [isShowAlert, alertStatus, alertText, throwAlert, closeAlert] =
    useAlertState(false);
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const enterPulldown = () => {
    setMouseOver(true);
  };

  const closePulldown = () => {
    setMouseOver(false);
  };

  const leavePulldown = () => {
    setTimeout(() => {
      setMouseOver(false);
    }, 300);
  };

  const handleLogout = async () => {
    if (window.confirm('ログアウトしますか？')) {
      try {
        await logout();
        await throwAlert('success', 'ログアウトしました。');
        setCurrentUser(null);
        history(`/`, { replace: true });
      } catch (error) {
        throwAlert('danger', error.message);
        await throwAlert('danger', 'ログアウトが失敗しました。');
      }
    }
  };

  return (
    <header className="l-header__container">
      <div className="l-header__top">
        <Link className="l-header__logo" to="/">
          <img src={logoIcon} alt="ロゴ" />
        </Link>
        <div className="l-header__right-box">
          {currentUser && (
            <Link to="/summary/create" className="l-header__sub-logo">
              <img src={editIcon} alt="ロゴ" />
            </Link>
          )}
          {currentUser && (
            <div
              className="l-header__sub-logo _userIcon"
              onMouseEnter={() => enterPulldown()}
            >
              <img
                src={
                  currentUser.photoURL ? currentUser.photoURL : userCircleIcon
                }
                alt="ロゴ"
                className="_icon"
              />
              <img src={caretDownIcon} alt="logo" className="_logo" />
              {mouseOver && (
                <div
                  className="_pull-down"
                  onMouseEnter={() => enterPulldown()}
                  onMouseLeave={() => leavePulldown()}
                >
                  <Link
                    to={`/mypage/${getId(currentUser)}/home`}
                    className="_item"
                  >
                    ユーザー情報
                  </Link>
                  <Link
                    onClick={() => closePulldown()}
                    to={`/mypage/${getId(currentUser)}/edit`}
                    className="_item"
                  >
                    会員情報を編集
                  </Link>
                  <div className="hr"></div>
                  <Link
                    onClick={() => closePulldown()}
                    to={`/mypage/${getId(currentUser)}/summaries`}
                    className="_item"
                  >
                    投稿記事一覧
                  </Link>
                  <Link
                    onClick={() => closePulldown()}
                    to={`/mypage/${getId(currentUser)}/favorites`}
                    className="_item"
                  >
                    いいね一覧
                  </Link>
                  <div className="hr"></div>
                  <div
                    className="_item"
                    onClick={() => {
                      handleLogout(), closePulldown();
                    }}
                  >
                    ログアウト
                  </div>
                </div>
              )}
            </div>
          )}
          {!currentUser && (
            <Link to="/sign_up" className="l-header__register-ttl">
              ユーザー登録
            </Link>
          )}
          {!currentUser && (
            <Link to="/sign_in" className="l-header__login-ttl">
              ログイン
            </Link>
          )}
          {/* <Navbar /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
