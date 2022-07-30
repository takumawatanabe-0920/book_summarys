import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SummaryForm } from '..';
import { getSummaryBook } from '../../../firebase/functions';
import { ResultResponse, ResSummaryBook } from '../../../types';

const SummaryEditPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [summarybook, setSummaryBook] = useState<ResSummaryBook>({});
  const { id } = useParams<'id'>();

  useEffect(() => {
    const loadData = async () => {
      const resSummary: ResultResponse<ResSummaryBook> = await getSummaryBook(
        id,
      );
      if (resSummary && resSummary.status === 200) {
        setSummaryBook(resSummary.data);
      }
      setLoading(true);
    };

    loadData();
  }, []);
  return (
    <>
      {loading && (
        <div className="summary_main">
          <div className="md-container">
            <div className="main-block _block-center">
              <SummaryForm isEdit={true} editData={summarybook} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryEditPage;
