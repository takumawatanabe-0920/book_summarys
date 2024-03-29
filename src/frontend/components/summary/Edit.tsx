import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SummaryForm } from '..';
import { load as loadSummary, Summary } from 'src/frontend/module/summary';
const SummaryEditPage = () => {
  const [summary, setSummary] = useState<Partial<Summary>>({});
  const { id } = useParams<'id'>();
  useEffect(() => {
    try {
      const loadData = async () => {
        const _summary = await loadSummary(id);
        setSummary(_summary);
      };
      loadData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {
        <div className="summary_main">
          <div className="md-container">
            <div className="main-block _block-center">
              <SummaryForm isEdit={true} summary={summary as Summary} />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default SummaryEditPage;
