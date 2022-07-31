import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MypageSidebar, RegisterForm } from '../..';
import { GlobalContext } from '../../../hooks/context/Global';
import { getId } from 'src/config/objectId';

const MypageEdit = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useNavigate();
  const { id } = useParams<'id'>();
  const { currentUser, setCurrentUser } = useContext(GlobalContext);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (id !== getId(currentUser)) {
        history(`/mypage/${id}/home`);
      }
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
                  <MypageSidebar user={currentUser} />
                  <div className="_mypage">
                    <h2 className="sub-ttl">会員情報編集</h2>
                    <RegisterForm userData={currentUser} isEdit={true} />
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
