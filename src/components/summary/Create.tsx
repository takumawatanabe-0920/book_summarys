import React from "react"
import { Link } from "react-router-dom"
import { SummaryForm } from "./../../components"

const SummaryCreatePage = () => {
  return (
    <>
      <div className="summary_main">
        <div className="main-block _block-center">
          <SummaryForm />
        </div>
      </div>
    </>
  )
}

export default SummaryCreatePage
