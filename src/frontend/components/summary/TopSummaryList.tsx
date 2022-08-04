import React, { useState, useEffect } from 'react';
import { SummaryItem } from '..';
import {
  loadAll as loadAllSummary,
  Summary,
} from 'src/frontend/module/summary';
import { getId } from 'src/config/objectId';

const TopSummaryList = () => {
  const [rankingThisMonthSummaries, setRankingThisMonthSummaries] = useState<
    Partial<Summary[]>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const settingsTopSlider = {
    isHiddenContent: true,
    isHiddenCategory: true,
    topSlider: true,
  };

  useEffect(() => {
    try {
      const loadData = async () => {
        try {
          const _summaries = await loadAllSummary({
            params: {
              limit: 6,
              page: 0,
              publishingStatus: 'public',
            },
            dataRange: 'month',
          });

          setRankingThisMonthSummaries(_summaries);
        } catch (e) {}
      };
      loadData();
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {loading && (
        <>
          {rankingThisMonthSummaries.map((data) => {
            return (
              <SummaryItem
                key={getId(data)}
                data={data}
                setting={settingsTopSlider}
                elType="top-summary-list"
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default TopSummaryList;
