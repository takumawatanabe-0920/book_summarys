import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ResUser as CurrentUser } from "../../types"
import {
  getCurrentUser,
  getMyNotReadNotificationsCount,
  responseUploadImage
} from "../../firebase/functions"
import { logoIcon, editIcon, userCircleIcon, bellIcon } from "../../utils/icons"

const user: CurrentUser = getCurrentUser()

const Header = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [notReadNotificationCount, setNotReadNotificationCount] = useState<
    number
  >(0)
  const [userIcon, setUserIcon] = useState<string>("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const notificationCount: number = await getMyNotReadNotificationsCount(
          currentUser.id
        )
        const resUserIcon: string = await responseUploadImage(
          currentUser.photoURL
        )
        setUserIcon(resUserIcon)
        setNotReadNotificationCount(notificationCount)
      } catch (e) {}
    }

    loadData()
  }, [])

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
            <Link to="/notification" className="l-header__sub-logo">
              {notReadNotificationCount !== 0 && (
                <span className="notification_count">
                  {notReadNotificationCount}
                </span>
              )}
              <img src={bellIcon} alt="ロゴ" />
            </Link>
          )}
          {currentUser && (
            <Link
              to={`/mypage/${currentUser.id}/home`}
              className="l-header__sub-logo _userIcon"
            >
              <img src={userIcon ? userIcon : userCircleIcon} alt="ロゴ" />
            </Link>
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
        </div>
      </div>
    </header>
  )
}

export default Header
