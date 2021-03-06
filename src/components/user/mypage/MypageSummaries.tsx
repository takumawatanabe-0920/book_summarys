import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  ResultResponseList,
  ResultResponse,
  ResSummaryBook,
  ResUser,
} from '../../../types';
import { MypageSidebar, MypageSummaryStackItem, Pager } from '../..';
import {
  getOneConditionsDescPaginationSummaries,
  getTwoConditionsDescPaginationSummaries,
  getOneConditionsSummaryCount,
  getTwoConditionsSummaryCount,
  getIdUser,
  readQuery,
} from '../../../firebase/functions';
import { GlobalContext } from '../../../assets/hooks/context/Global';

const MypageSummaries = () => {
  const [user, setUser] = useState<ResUser>({});
  const [summaries, setSummaries] = useState<ResSummaryBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const slug: { id: string } = useParams();
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [page, setPage] = useState(Number(readQuery('pages') || 1));
  const [summariesNum, setSummariesNum] = useState(0);
  const [dataNumPerPage, setDataNumPerPager] = useState(8);

  const fetchPager = (num: number) => {
    setPage(num);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const resUser: ResultResponse<ResUser> = await getIdUser(slug.id);
        let resMySummariesDataList: ResultResponseList<ResSummaryBook>;
        let resSummariesNum = 0;
        if ((currentUser && currentUser.id) === slug.id) {
          resMySummariesDataList =
            await getOneConditionsDescPaginationSummaries(
              dataNumPerPage,
              page,
              ['user_id', slug.id],
            );
          resSummariesNum = await getOneConditionsSummaryCount([
            'user_id',
            slug.id,
          ]);
        } else {
          resMySummariesDataList =
            await getTwoConditionsDescPaginationSummaries(
              dataNumPerPage,
              page,
              ['user_id', slug.id, 'publishing_status', 'public'],
            );
          resSummariesNum = await getTwoConditionsSummaryCount([
            'user_id',
            slug.id,
            'publishing_status',
            'public',
          ]);
        }
        setSummariesNum(resSummariesNum);
        if (resUser && resUser.status === 200) {
          setUser(resUser.data);
        }
        if (resMySummariesDataList && resMySummariesDataList.status === 200) {
          setSummaries(resMySummariesDataList.data);
        }
      } catch (e) {}
    };
    loadData();
    setLoading(true);
  }, [page, slug]);

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
                    <h2 className="sub-ttl">??????????????????</h2>
                    {summaries && summaries.length > 0 && (
                      <>
                        {summaries.map((summaryBook: ResSummaryBook) => {
                          return <MypageSummaryStackItem data={summaryBook} />;
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
