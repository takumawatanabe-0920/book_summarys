import React, { FC, useState, useEffect } from "react"
import { getRankingSummaries } from "../../firebase/functions"
import Slider from "react-slick"
import { SummaryItem } from "../../components"
import { ResultResponseList, ResSummaryBook } from "../../types"

const TopSummaryList = () => {
  const [allRankingSummaries, setAllRankingSummaries] = useState<
    ResSummaryBook[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1
  }

  const settingsTopSlider = {
    isHiddenContent: true,
    isHiddenCategory: true,
    topSlider: true
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        let resSummariesRankingDataList: ResultResponseList<ResSummaryBook> = await getRankingSummaries(
          6,
          "public"
        )
        if (
          resSummariesRankingDataList &&
          resSummariesRankingDataList.status === 200
        ) {
          setAllRankingSummaries(resSummariesRankingDataList.data)
        }
      } catch (e) {}
    }
    loadData()
  }, [])

  return (
    <>
      {loading && (
        <Slider {...settings}>
          {allRankingSummaries.map((data: ResSummaryBook) => {
            return (
              <SummaryItem
                key={data.id}
                data={data}
                setting={settingsTopSlider}
              />
            )
          })}
        </Slider>
      )}
    </>
  )
}

export default TopSummaryList
