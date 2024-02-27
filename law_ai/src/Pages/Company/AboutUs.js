import React from 'react'
import HerosectionHeader from '../../Componet/Herosection/HerosectionHeader'
import FeatureL2 from '../../Componet/Feature/FeatureL2'
import AboutL3 from '../../Componet/About/AboutL3'
import TestimonialL1 from '../../Componet/Testimonial/TestimonialL1'
import BlogL1 from '../../Componet/Blog/BlogL1'
import PricingL2 from '../../Componet/Pricing/PricingL2'

const AboutUs = () => {
  return (
    <>
      <HerosectionHeader name={"AboutUS"} />
      <div className="page-content">
        <FeatureL2 />
        <PricingL2/>
        <AboutL3 />
        <TestimonialL1 />
        <BlogL1 />
      </div>
    </>
  )
}

export default AboutUs
