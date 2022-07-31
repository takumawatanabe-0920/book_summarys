import React, { useState, useEffect } from 'react';
// components
import { SummaryList, SummaryCategories, Pager, Loading } from '..';
import { readQuery } from '../../../firebase/functions';
import {
  loadAll as loadAllSummary,
  count as countSummary,
  Summary,
} from 'src/frontend/module/summary';
type UpdateData = {
  query: string;
  name: string;
};

const SummaryIndexPage = () => {
  const [summaries, setSummaries] = useState<Partial<Summary[]>>([]);
  const [selectSummaries, setSelectSummaries] = useState<Partial<Summary[]>>(
    [],
  );
  const [summariesNum, setSummariesNum] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(Number(readQuery('pages') || 1));
  const [updateData, setUpdateData] = useState<UpdateData>({
    query: readQuery('category'),
    name: '',
  });
  const dataNumPerPage = 6;

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
        const _summaries = await loadAllSummary({
          params: {
            limit: 6,
            page: 1,
            publishingStatus: 'public',
            sortBy: 'updatedAt',
            order: 'desc',
          },
        });
        setSummaries(_summaries);
        const _selectSummaries = await loadAllSummary({
          params: {
            limit: dataNumPerPage,
            page,
            categoryId: updateData.query,
            publishingStatus: 'public',
          },
        });
        let count = 0;
        if (updateData?.query) {
          count = await countSummary({
            params: {
              categoryId: updateData.query,
              publishingStatus: 'public',
            },
          });
        }
        setSelectSummaries(_selectSummaries);
        setSummariesNum(count);
        setLoading(true);
      } catch (e) {
        console.log(e);
      }
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
                    {updateData && updateData.name}記事
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
                    <h3 className="not-find">記事が見当たりませんでした。</h3>
                  )}
                </div>
              )}
              <div className="article-block">
                <h2 className="main-title blue-main-title">おすすめ記事！</h2>
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
