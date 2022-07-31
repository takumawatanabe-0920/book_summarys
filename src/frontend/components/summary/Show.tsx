import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SummaryDetails, SummaryList, Sidebar, Loading } from '..';
import { GlobalContext } from '../../hooks/context/Global';
import { getId } from 'src/config/objectId';
import {
  load as loadSummary,
  loadAll as loadAllSummary,
  Summary,
} from 'src/frontend/module/summary';

const SummaryShowPage = () => {
  const [summary, setSummary] = useState<Partial<Summary>>({});
  const [summaries, setSummaries] = useState<Partial<Summary[]>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useContext(GlobalContext);

  const { id } = useParams<'id'>();

  const publicSummary = (_type: string, user_id: string) => {
    if (_type === 'public' || getId(currentUser) === user_id) {
      return (
        <div className="main-block article-block">
          <SummaryDetails
            summary={summary as Summary}
            currentUser={currentUser}
          />
          <div className="article-block mt4">
            <h2 className="main-title blue-main-title blue-back">関連記事</h2>
            <SummaryList dataList={summaries} articleType="stack" />
          </div>
        </div>
      );
    } else if (_type === 'private') {
      return (
        <div className="main-block article-block">
          <p className="publishing-text">この記事は非公開です。</p>
          <div className="mosaic">
            <SummaryDetails
              summary={summary as Summary}
              currentUser={currentUser}
            />
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    const loadData = async () => {
      window.scrollTo(0, 0);
      try {
        const _summary = await loadSummary(id);
        setSummary(_summary);

        const _summaries = await loadAllSummary({
          params: {
            categoryId: getId(_summary.category),
            publishingStatus: 'public',
            sortKey: 'updatedAt',
            order: 'desc',
            limit: 3,
            page: 1,
          },
        });

        setSummaries(_summaries);

        setLoading(true);
      } catch (e) {
        console.log(e);
      }
    };

    loadData();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="summary_main">
          {publicSummary(summary.publishingStatus, getId(summary.user))}
          <Sidebar />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SummaryShowPage;
