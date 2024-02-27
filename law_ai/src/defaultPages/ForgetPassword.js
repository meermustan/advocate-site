import React from 'react'
import HerosectionHeader from '../Componet/Herosection/HerosectionHeader'
import NewsletterL1 from '../Componet/Newsletter/NewsletterL1'
import Forgotpass from './Login/Component/ForgetPasswordComp'

const Forgotpassword=()=> {
  return (
    <>
        <HerosectionHeader name={"Forgot Password"}/>
        <div className="page-content">
            <Forgotpass />
        </div>
    </>
  )
}

export default Forgotpassword
