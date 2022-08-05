import React, { useState, useEffect } from 'react';
import { SummaryItem } from '..';
import {
  loadAll as loadAllSummary,
  Summary,
} from 'src/frontend/module/summary';
import { getId } from 'src/config/objectId';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const arrowStyles = {
  position: 'absolute',
  width: 40,
  height: 40,
  zIndex: 2,
  top: 'calc(50% - 15px)',
};
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
              page: 1,
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
        <Carousel
          showStatus={false}
          showArrows={false}
          emulateTouch
          swipeable
          autoPlay
          interval={2000}
        >
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
        </Carousel>
      )}
    </>
  );
};

export default TopSummaryList;
