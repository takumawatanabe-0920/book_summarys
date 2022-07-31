import React, { useState, useEffect } from 'react';
// import Slider from 'react-slick';
import { SummaryItem } from '..';
import {
  loadAll as loadAllSummary,
  Summary,
} from 'src/frontend/module/summary';

const TopSummaryList = () => {
  const [rankingThisMonthSummaries, setRankingThisMonthSummaries] = useState<
    Partial<Summary[]>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  // let settings;
  // if (window.innerWidth < 768) {
  //   settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     autoplay: true,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //   };
  // } else if (window.innerWidth < 1040) {
  //   settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     autoplay: true,
  //     slidesToShow: 2,
  //     slidesToScroll: 2,
  //   };
  // } else {
  //   settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     autoplay: true,
  //     slidesToShow: 3,
  //     slidesToScroll: 3,
  //   };
  // }

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
        // <Slider {...settings}>
        <>
          {rankingThisMonthSummaries.map((data) => {
            return (
              <SummaryItem
                key={data.id}
                data={data}
                setting={settingsTopSlider}
                elType="top-summary-list"
              />
            );
          })}
        </>
        // </Slider>
      )}
    </>
  );
};

export default TopSummaryList;
