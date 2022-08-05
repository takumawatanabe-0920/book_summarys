import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { getId } from 'src/config/objectId';
import {
  loadAll as loadAllSummary,
  Summary,
} from 'src/frontend/module/summary';

const Sidebar = () => {
  const [allRankingSummaries, setAllRankingSummaries] = useState<
    Partial<Summary[]>
  >([]);
  const [rankingThisWeekSummaries, setRankingThisWeekSummaries] = useState<
    Partial<Summary[]>
  >([]);
  const [rankingThisMonthSummaries, setRankingThisMonthSummaries] = useState<
    Partial<Summary[]>
  >([]);
  const history = useNavigate();

  const changeUrl = (_data: any) => {
    history(`/summary/${getId(_data)}`);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const summaries = await loadAllSummary({
          params: {
            limit: 3,
            page: 1,
            publishingStatus: 'public',
          },
          dataRange: 'all',
        });
        const weekSummaries = await loadAllSummary({
          params: {
            limit: 3,
            page: 1,
            publishingStatus: 'public',
          },
          dataRange: 'week',
        });
        const monthSummaries = await loadAllSummary({
          params: {
            limit: 3,
            page: 1,
            publishingStatus: 'public',
          },
          dataRange: 'month',
        });
        setAllRankingSummaries(summaries);
        setRankingThisWeekSummaries(weekSummaries);
        setRankingThisMonthSummaries(monthSummaries);
      } catch (e) {
        console.error({ e });
      }
    };

    loadData();
  }, []);

  return (
    <div className="side-bar">
      <h3 className="border-orange">週間ランキング</h3>
      <div className="article-box">
        {rankingThisWeekSummaries &&
          rankingThisWeekSummaries.map((summary, _index) => {
            return (
              <dl>
                <dt>
                  <span className={clsx('ranking', `ranking-week`)}>
                    {_index + 1}
                  </span>
                </dt>
                <dd>
                  <Link
                    to={`/summary/${getId(summary)}`}
                    className="article-item"
                    key={getId(summary)}
                  >
                    {summary.title}
                  </Link>
                </dd>
              </dl>
            );
          })}
      </div>
      <h3 className="border-green">月刊ランキング</h3>
      <div className="article-box">
        {rankingThisMonthSummaries &&
          rankingThisMonthSummaries.map((summary, _index) => {
            return (
              <dl>
                <dt>
                  <span className={clsx('ranking', `ranking-month`)}>
                    {_index + 1}
                  </span>
                </dt>
                <dd>
                  <div
                    onClick={() => changeUrl(summary)}
                    className="article-item"
                    key={getId(summary)}
                  >
                    {summary.title}
                  </div>
                </dd>
              </dl>
            );
          })}
      </div>
      <h3 className="border-blue">総合ランキング</h3>
      <div className="article-box mbt0">
        {allRankingSummaries &&
          allRankingSummaries.map((summary, _index) => {
            return (
              <dl>
                <dt>
                  <span className={clsx('ranking', `ranking-total`)}>
                    {_index + 1}
                  </span>
                </dt>
                <dd>
                  <Link
                    to={`/summary/${getId(summary)}`}
                    className="article-item"
                    key={getId(summary)}
                  >
                    {summary.title}
                  </Link>
                </dd>
              </dl>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
