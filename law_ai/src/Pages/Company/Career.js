import React from 'react'
import HerosectionHeader from '../../Componet/Herosection/HerosectionHeader'
import AboutCareer from './AboutCareer'
import OpenPosition from './OpenPosition'

function Career() {
    return (
        <>
            <HerosectionHeader folder1={"pages"} folder2={"Company"} name={"Career"} />
            <div className="page-content">
                <AboutCareer />
                <OpenPosition />
            </div>
        </>
    )
}

export default Career
