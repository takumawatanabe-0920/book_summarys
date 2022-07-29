import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ResUser, ResSummaryComment, ResultResponseList } from '../../../types';
import { MypageSidebar, MypageSummaryStackItem, Pager } from '../..';
import {
  getMyComments,
  readQuery,
  getMyCommentCount,
} from '../../../firebase/functions';
import { load as loadUser } from 'src/frontend/module/user';
const MypageComments = () => {
  const [user, setUser] = useState<ResUser>({});
  const [summaryComments, setSummaryComments] = useState<ResSummaryComment[]>(
    [],
  );
  const [myCommentsNum, setMyCommentsNum] = useState(0);
  const [dataNumPerPage, setDataNumPerPager] = useState(8);
  const [page, setPage] = useState(Number(readQuery('pages') || 1));
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<'id'>();

  const fetchPager = (num: number) => {
    setPage(num);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const user = await loadUser(id);
        const resMySummaryCommentsDataList: ResultResponseList<ResSummaryComment> =
          await getMyComments(dataNumPerPage, page, id);
        const count: number = await getMyCommentCount(id);
        setMyCommentsNum(count);
        setUser(user);
        if (
          resMySummaryCommentsDataList &&
          resMySummaryCommentsDataList.status === 200
        ) {
          setSummaryComments(resMySummaryCommentsDataList.data);
        }
      } catch (e) {}
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
                  <MypageSidebar user={user} />
                  <div className="_mypage">
                    <h2 className="sub-ttl">コメントした記事一覧</h2>
                    {summaryComments &&
                      summaryComments.map(
                        (summaryComment: ResSummaryComment) => {
                          return (
                            <MypageSummaryStackItem
                              data={summaryComment.summary_id}
                            />
                          );
                        },
                      )}
                    <Pager
                      fetchPager={fetchPager}
                      dataNum={myCommentsNum}
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

export default MypageComments;
