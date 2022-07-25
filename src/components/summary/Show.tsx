import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  ResSummaryBook,
  ResSummaryComment,
  ResultResponseList,
  ResultResponse,
} from '../../types';
import {
  SummaryDetails,
  SummaryComment,
  SummaryCommentForm,
  SummaryList,
  Sidebar,
  Loading,
} from './../../components';
import {
  getSummaryBookPopulate,
  getSummaryComments,
  getTwoConditionsSummaries,
} from '../../firebase/functions';
import { GlobalContext } from './../../assets/hooks/context/Global';

const SummaryShowPage = () => {
  const [summarybook, setSummaryBook] = useState<ResSummaryBook>({});
  const [involvedSummaries, setInvolvedSummaries] = useState<ResSummaryBook[]>(
    [],
  );
  const [summaryCommentList, setSummaryCommentList] = useState<
    ResSummaryComment[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser, setCurrentUser } = useContext(GlobalContext);

  const { id } = useParams<'id'>();

  const publicSummary = (_type: string, user_id: string) => {
    if (_type === 'public' || (currentUser && currentUser.id === user_id)) {
      return (
        <div className="main-block article-block">
          <SummaryDetails summaryBook={summarybook} currentUser={currentUser} />
          <SummaryComment<ResSummaryComment> dataList={summaryCommentList} />
          {currentUser && currentUser.id ? (
            <SummaryCommentForm
              slug={{ id }}
              user_id={currentUser.id}
              summary_book={summarybook}
            />
          ) : (
            <p>ログインをしてからコメントをしよう</p>
          )}
          <div className="article-block mt4">
            <h2 className="main-title blue-main-title blue-back">関連記事</h2>
            <SummaryList dataList={involvedSummaries} articleType="stack" />
          </div>
        </div>
      );
    } else if (_type === 'private') {
      return (
        <div className="main-block article-block">
          <p className="publishing-text">この記事は非公開です。</p>
          <div className="mosaic">
            <SummaryDetails
              summaryBook={summarybook}
              currentUser={currentUser}
            />
            <SummaryComment<ResSummaryComment> dataList={summaryCommentList} />
            {currentUser && currentUser.id ? (
              <SummaryCommentForm
                slug={{ id }}
                user_id={currentUser.id}
                summary_book={summarybook}
              />
            ) : (
              <p>ログインをしてからコメントができるよ</p>
            )}
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    const loadData = async () => {
      window.scrollTo(0, 0);
      try {
        const resSummaryCommentList: ResultResponseList<ResSummaryComment> =
          await getSummaryComments(id);
        if (resSummaryCommentList && resSummaryCommentList.status === 200) {
          setSummaryCommentList(resSummaryCommentList.data);
        }

        const resSummaryBook: ResultResponse<ResSummaryBook> =
          await getSummaryBookPopulate(id);
        if (resSummaryBook && resSummaryBook.status === 200) {
          setSummaryBook(resSummaryBook.data);
        }

        const resInvolvedSummaryBookList: ResultResponseList<ResSummaryBook> =
          await getTwoConditionsSummaries(
            3,
            1,
            ['update_date', 'desc'],
            [
              'publishing_status',
              'public',
              'category',
              resSummaryBook &&
                resSummaryBook.data &&
                resSummaryBook.data.category.id,
            ],
          );
        if (
          resInvolvedSummaryBookList &&
          resInvolvedSummaryBookList.status === 200
        ) {
          setInvolvedSummaries(resInvolvedSummaryBookList.data);
        }

        setLoading(true);
      } catch (e) {}
    };

    loadData();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="summary_main">
          {publicSummary(summarybook.publishing_status, summarybook.user_id.id)}
          <Sidebar />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SummaryShowPage;
