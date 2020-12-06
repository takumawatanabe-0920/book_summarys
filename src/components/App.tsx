import React, { useState, useEffect, useMemo } from "react"
// components
import { SummaryList, Sidebar, TopSummaryList } from "./../components"
import { ResSummaryBook, ResultResponseList } from "./../types"
import { getNewSummaries } from "../firebase/functions"
import { Link } from "react-router-dom"

const HomePage = () => {
  const [summaries, setSummaries] = useState<ResSummaryBook[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        let resSummariesDataList: ResultResponseList<ResSummaryBook> = await getNewSummaries(
          6,
          "public"
        )
        if (resSummariesDataList && resSummariesDataList.status === 200) {
          setSummaries(resSummariesDataList.data)
        }
      } catch (e) {}
    }

    loadData()
  }, [])

  return (
    <>
      {loading && (
        <>
          <TopSummaryList />
          <div className="l-main">
            <div className="main-block">
              <div className="article-block">
                <h2 className="main-title blue-main-title blue-back">
                  新着記事
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
                  おすすめ記事！
                </h2>
                <SummaryList dataList={summaries} />
                <div className="btn-area">
                  <Link to="/summary" className="_btn center-btn">
                    もっと見る
                  </Link>
                </div>
              </div>
            </div>
            <Sidebar />
          </div>
        </>
      )}
    </>
  )
}

export default HomePage
