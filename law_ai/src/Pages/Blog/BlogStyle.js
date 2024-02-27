import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { setSelectedBlog } from '../../store/reducer/blogReducer';
import HerosectionHeader from '../../Componet/Herosection/HerosectionHeader';
import ProductPagination from '../../Componet/ProductPagination';

function BlogStyle() {
    const blogs = useSelector((state) => state.blog.blogItems);
    const dispatch = useDispatch()
    const [activePage, setActivePage] = useState(1);
    const pageSize = 3;

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };
    const totalPages = Math.ceil(blogs.length / pageSize);

    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const blogsToShow = blogs.slice(startIndex, endIndex);
    return (
        <>
            <HerosectionHeader folder1={"pages"} folder2={"Blog"} name={"Blog Card Style"} />
            <div className="page-content">
                <section>
                    <div className="container">

                        <div className="row">
                            {blogsToShow.map((blog) => (
                                <div className="col-md-6 col-lg-4 mb-5 mb-lg-0" key={blog.id}>
                                    <div className="card border-0 shadow bg-transparent">
                                        <img
                                            className="card-img-top"
                                            src={require(`../../assets/images/blog/${blog.image.split('/')[3]}`)}
                                            alt="Image1"
                                        />

                                        <div className="card-body p-4">
                                            <div>
                                                <div className="d-inline-block bg-light text-center px-2 py-1 rounded me-2">
                                                    <span className="text-primary">{blog.date}</span>
                                                </div>
                                                <Link to="/blog-single" onClick={() => { dispatch(setSelectedBlog(blog.id)) }} className="d-inline-block btn-link">
                                                    {blog.category}
                                                </Link>
                                            </div>
                                            <h2 className="h5 my-3">
                                                <Link to="/blog-single" className="link-title" onClick={() => { dispatch(setSelectedBlog(blog.id)) }} >
                                                    {blog.title}
                                                </Link>
                                            </h2>
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item pe-3">
                                                    <Link to="/" className="list-group-item-action">
                                                        <i className="lar la-user-circle me-1 text-primary ic-1x"></i> {blog.author}
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item pe-3">
                                                    <Link to="/" className="list-group-item-action">
                                                        <i className="las la-eye me-1 text-primary ic-1x"></i> {blog.views}
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link to="/" className="list-group-item-action">
                                                        <i className="lar la-comments me-1 text-primary ic-1x"></i> {blog.comments}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="row mt-6">
                            <div className="col-12">
                                <ProductPagination
                                    activePage={activePage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default BlogStyle
