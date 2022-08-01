import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MypageSidebar, MypageSummaryStackItem, Pager } from '../..';
import { readQuery } from '../../../../firebase/functions';
import { GlobalContext } from '../../../hooks/context/Global';
import { load as loadUser } from 'src/frontend/module/user';
import { getId } from 'src/config/objectId';
import { User } from 'src/frontend/module/user';
import {
  loadAll as loadAllSummary,
  count as countSummary,
  Summary,
} from 'src/frontend/module/summary';

const MypageSummaries = () => {
  const [user, setUser] = useState<Partial<User>>({});
  const [summaries, setSummaries] = useState<Partial<Summary[]>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<'id'>();
  const { currentUser } = useContext(GlobalContext);
  const [page, setPage] = useState(Number(readQuery('pages') || 1));
  const [summariesNum, setSummariesNum] = useState(0);
  const dataNumPerPage = 8;

  const fetchPager = (num: number) => {
    setPage(num);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await loadUser(id);
        setUser(user);
        let _summaries = [];
        let count = 0;
        if (getId(currentUser) === id) {
          _summaries = await loadAllSummary({
            params: {
              limit: dataNumPerPage,
              page,
              userId: id,
            },
          });
          count = await countSummary({
            params: {
              userId: id,
            },
          });
        } else {
          _summaries = await loadAllSummary({
            params: {
              limit: dataNumPerPage,
              page,
              userId: id,
            },
          });
          count = await countSummary({
            params: {
              userId: id,
            },
          });
        }
        setSummariesNum(count);
        setSummaries(_summaries);
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
    setLoading(true);
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
                    <h2 className="sub-ttl">投稿記事一覧</h2>
                    {summaries && summaries.length > 0 && (
                      <>
                        {summaries.map((summary) => {
                          return <MypageSummaryStackItem data={summary} />;
                        })}
                        <Pager
                          fetchPager={fetchPager}
                          dataNum={summariesNum}
                          dataNumPerPage={dataNumPerPage}
                        />
                      </>
                    )}
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

export default MypageSummaries;
