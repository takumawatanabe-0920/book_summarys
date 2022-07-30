import React, { useState, useEffect } from 'react';
import { ResUser, ResultResponse } from '../../../../types';
import { useParams } from 'react-router-dom';
import { MypageSidebar } from '../..';
import { load as loadUser } from 'src/frontend/module/user';

const Mypage = () => {
  const [user, setUser] = useState<ResUser>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<'id'>();
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const user = await loadUser(id);
        setUser(user);
      } catch (e) {}
    };

    loadData();
  }, []);

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
                  <div className="_main-block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mypage;
