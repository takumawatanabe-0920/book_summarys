import React, { useState, FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { readQuery } from 'src/utils/function';

type props = {
  fetchPager: any;
  dataNum: number;
  dataNumPerPage: number;
};

const Pager: FC<props> = (props) => {
  const [page, setPage] = useState(Number(readQuery('page') || 0));

  const { fetchPager, dataNum, dataNumPerPage } = props;
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const location = useLocation();

  const updateData = (num?: number) => {
    setPage(num);
    const searchParams: { page?: number } = {};
    searchParams.page = num;
    const searchQuery = queryString.stringify(searchParams);
    const queryPath = location.search.replace(/[?&]+\page=\d+/gi, '');
    if (location && !queryPath.match(/[?]/)) {
      navigate(`${`${path}`}?${`${queryPath}&`}${searchQuery}`);
    } else if (queryPath.match(/[?]/)) {
      navigate(`${`${path}`}${`${queryPath}&`}${searchQuery}`);
    } else {
      navigate(`${`${path}?`}${searchQuery}`);
    }
    fetchPager(num);
  };

  const prevNum = () => {
    const prevNum = page - 1;
    if (!(prevNum > 0)) {
      return '';
    } else {
      return (
        <div className="pager-num" onClick={() => updateData(prevNum)}>
          <p>{prevNum}</p>
        </div>
      );
    }
  };

  const nextNum = () => {
    const nextNum = page + 1;
    if (nextNum > Math.ceil(dataNum / dataNumPerPage)) {
      return '';
    } else {
      return (
        <div className="pager-num" onClick={() => updateData(nextNum)}>
          <p>{nextNum}</p>
        </div>
      );
    }
  };

  return (
    <>
      <div className="pager">
        {prevNum()}
        <div className="pager-num active">
          <p>{page}</p>
        </div>
        {nextNum()}
      </div>
    </>
  );
};

export default Pager;
