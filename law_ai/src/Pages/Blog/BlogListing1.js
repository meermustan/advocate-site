import React from 'react'
import BlogListing1Comp from './BlogListing1Comp'
import HerosectionHeader from '../../Componet/Herosection/HerosectionHeader'


const BlogListing1 = () => {
    return (
        <>
            <HerosectionHeader name={"Blogs"} />
            <div className="page-content">
                <BlogListing1Comp />
            </div>
        </>
    )
}

export default BlogListing1
