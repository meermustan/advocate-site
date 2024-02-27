import React from 'react'
import Privacy from '../../Componet/PrivicyPolicy'
import HerosectionHeader from '../../Componet/Herosection/HerosectionHeader'

function PrivacyPolicy() {
  return (
    <>
      <HerosectionHeader folder1={"pages"} folder2={"Utilities"} name={" Privacy&Policy"} />
      <div className="page-content">
        <Privacy />
      </div>
    </>
  )
}

export default PrivacyPolicy
