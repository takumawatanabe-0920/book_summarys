import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ResUser } from '../../../../types';
import { MypageSidebar, MypageProfile } from '../..';
import { load as loadUser } from 'src/frontend/module/user';

const MypageEdit = () => {
  const [user, setUser] = useState<ResUser>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<'id'>();

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await loadUser(id);
        setUser(user);
        setLoading(true);
      } catch (e) {}
    };

    loadData();
  }, [id]);

  return (
    <>
      {loading && Object.keys(user).length > 0 && (
        <div className="mypage_main">
          <div className="l-container">
            <div className="main-block _block-center">
              <div className="user-mypage">
                <h1 className="main-title blue-main-title">MY PAGE</h1>
                <div className="mypage-content">
                  <MypageSidebar user={user} />
                  <div className="_mypage">
                    <h2 className="sub-ttl">会員情報</h2>
                    <MypageProfile user={user} />
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

export default MypageEdit;