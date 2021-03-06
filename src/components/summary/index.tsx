import React, { useState, useEffect } from 'react';
// components
import { SummaryList, SummaryCategories, Pager, Loading } from '..';
import { ResSummaryBook, ResultResponseList } from '../../types';
import {
  getOneConditionsSummaries,
  readQuery,
  getTwoConditionsSummaryCount,
  getTwoConditionsDescPaginationSummaries,
} from '../../firebase/functions';

type UpdateData = {
  query: string;
  name: string;
};

const SummaryIndexPage = () => {
  const [summaries, setSummaries] = useState<ResSummaryBook[]>([]);
  const [selectSummaries, setSelectSummaries] = useState<ResSummaryBook[]>([]);
  const [summariesNum, setSummariesNum] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(Number(readQuery('pages') || 1));
  const [updateData, setUpdateData] = useState<UpdateData>({
    query: readQuery('category'),
    name: '',
  });
  const [dataNumPerPage, setDataNumPerPager] = useState(6);

  const fetchData = (categoryId?: string, categoryName?: string) => {
    setUpdateData({ query: categoryId, name: categoryName });
    const resetPage = 1;
    setPage(resetPage);
  };

  const fetchPager = (num: number) => {
    setPage(num);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        let resSummariesDataList: ResultResponseList<ResSummaryBook> =
          await getOneConditionsSummaries(
            6,
            1,
            ['update_date', 'desc'],
            ['publishing_status', 'public'],
          );
        if (resSummariesDataList && resSummariesDataList.status === 200) {
          setSummaries(resSummariesDataList.data);
        }
        let resSelectSummariesDataList: ResultResponseList<ResSummaryBook> =
          await getTwoConditionsDescPaginationSummaries(dataNumPerPage, page, [
            'category',
            updateData.query,
            'publishing_status',
            'public',
          ]);
        let count: number = 0;
        if (updateData && updateData.query) {
          count = await getTwoConditionsSummaryCount([
            'category',
            updateData.query,
            'publishing_status',
            'public',
          ]);
        }
        if (
          resSelectSummariesDataList &&
          resSelectSummariesDataList.status === 200
        ) {
          setSelectSummaries(resSelectSummariesDataList.data);
        }
        setSummariesNum(count);
        setLoading(true);
      } catch (e) {}
    };

    loadData();
  }, [page, updateData]);

  return (
    <>
      {loading ? (
        <div className="summary-contents">
          <SummaryCategories fetchData={fetchData} />
          <div className="l-container">
            <div className="main-block _block-center">
              {updateData && updateData.query && (
                <div className="article-block">
                  <h2 className="main-title blue-main-title">
                    {updateData && updateData.name}??????
                  </h2>
                  {selectSummaries.length > 0 ? (
                    <>
                      <SummaryList dataList={selectSummaries} />
                      <Pager
                        fetchPager={fetchPager}
                        dataNum={summariesNum}
                        dataNumPerPage={dataNumPerPage}
                      />
                    </>
                  ) : (
                    <h3 className="not-find">??????????????????????????????????????????</h3>
                  )}
                </div>
              )}
              <div className="article-block">
                <h2 className="main-title blue-main-title">?????????????????????</h2>
                <SummaryList dataList={summaries} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SummaryIndexPage;
