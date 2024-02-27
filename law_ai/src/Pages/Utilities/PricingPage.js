import React from 'react'
import HerosectionHeader from '../../Componet/Herosection/HerosectionHeader'
import PricingL2 from '../../Componet/Pricing/PricingL2'

function Pricing() {
  return (
    <div>
      <HerosectionHeader name={"Pricing"} />
      <div className="page-content">
        <PricingL2 />
      </div>
    </div>
  )
}

export default Pricing
