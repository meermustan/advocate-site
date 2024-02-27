import React from 'react'

import HerosectionHeader from '../Componet/Herosection/HerosectionHeader'
import Login2 from './Login/Component/Login2'

function Signin2() {
  return (
   <>
    <HerosectionHeader  folder1={"pages"} folder2={"Account"} name={"Login Two"}/>
    <div className="page-content">
      <Login2 />
    </div>
   </>
  )
}

export default Signin2
