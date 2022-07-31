import React, { useState, useEffect } from 'react';
// components
import { SummaryList, Sidebar, TopSummaryList, Loading } from '.';
import {
  loadAll as loadAllSummary,
  Summary,
} from 'src/frontend/module/summary';
import { Link } from 'react-router-dom';
const HomePage = () => {
  const [summaries, setSummaries] = useState<Partial<Summary[]>>([]);
  const [newSummaries, setNewSummaries] = useState<Partial<Summary[]>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const _summaries = await loadAllSummary({
          params: {
            limit: 6,
            page: 1,
            publishingStatus: 'public',
          },
        });
        const _newSummaries = await loadAllSummary({
          params: {
            limit: 4,
            page: 1,
            sortKey: 'updatedAt',
            order: 'desc',
            publishingStatus: 'public',
          },
        });
        setSummaries(_summaries);
        setNewSummaries(_newSummaries);
        setLoading(true);
      } catch (e) {
        console.error(e);
      }
    };

    loadData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <TopSummaryList />
          <div className="l-main">
            <div className="main-block">
              <div className="article-block">
                <h2 className="main-title blue-main-title blue-back">
                  おすすめ記事！
                </h2>
                <SummaryList dataList={summaries} />
                <div className="btn-area">
                  <Link to="/summary" className="_btn center-btn">
                    もっと見る
                  </Link>
                </div>
              </div>
              <div className="article-block">
                <h2 className="main-title blue-main-title blue-back">
                  新着記事
                </h2>
                <SummaryList dataList={newSummaries} articleType="stack" />
              </div>
            </div>
            <Sidebar />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default HomePage;
