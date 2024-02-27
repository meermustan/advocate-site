import React from 'react'
import Terms from '../../Componet/Terms'
import HerosectionHeader from '../../Componet/Herosection/HerosectionHeader'


function TermsConditions() {
    return (
        <>
            <HerosectionHeader folder1={"pages"} folder2={"Utilities"} name={"Terms and Conditions"} />
            <div className="page-content">
                <Terms />
            </div>
        </>
    )
}

export default TermsConditions
