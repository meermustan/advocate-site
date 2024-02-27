import React from 'react'
import Herosection from '../Componet/Herosection/HerosectionL1'
import Featurestart from '../Componet/Feature/FeatureL1'
import AboutL1 from '../Componet/About/AboutL1'
import Multisecstart from '../Componet/Multisec/MultisecsL1'
import TestimonialL1 from '../Componet/Testimonial/TestimonialL1'
import Blog from '../Componet/Blog/BlogL1'
import Newsletter from '../Componet/Newsletter/NewsletterL1'

function HomePage() {
  return (
    <div>
      <Herosection />
      <div className="page-content">
        <Featurestart />
        <AboutL1 />
        <Multisecstart />
        <TestimonialL1 />
        <Blog />
        <Newsletter />
      </div>
    </div>
  )
}

export default HomePage
