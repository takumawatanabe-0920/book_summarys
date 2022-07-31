import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { userCircleIcon } from '../../../../utils/icons';
import clsx from 'clsx';
import { User } from 'src/frontend/module/user';
import { getId } from 'src/config/objectId';
type Props = {
  user: User;
  size?: string;
};

const UserIcon: FC<Props> = (props) => {
  const { user, size } = props;

  return (
    <>
      {Object.keys(user) && (
        <Link to={`/mypage/${getId(user)}/home`} className="_user-icon-area">
          <div className={clsx('_icon', `${size === 'min' ? 'min-icon' : ''}`)}>
            <LazyLoadImage
              alt="ロゴ"
              effect="blur"
              src={user.photoURL ? user.photoURL : userCircleIcon}
            />
          </div>
          <p
            className={clsx('_user-txt', `${size === 'min' ? 'min-txt' : ''}`)}
          >
            {user.displayName}
          </p>
        </Link>
      )}
    </>
  );
};

export default UserIcon;
