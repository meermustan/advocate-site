import React from 'react'
import HerosectionHeader from '../../Componet/Herosection/HerosectionHeader'
import AboutFAQ from '../../Componet/About/AboutFaq'

function FAQ() {
  return (
    <>
        <HerosectionHeader name={"FAQ"} />
        <div className="page-content">
            <AboutFAQ />
        </div>
    </>
  )
}

export default FAQ
