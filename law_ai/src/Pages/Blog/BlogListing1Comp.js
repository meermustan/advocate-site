import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductPagination from '../../Componet/ProductPagination';
import { setSelectedBlog } from '../../store/reducer/blogReducer';
import posts from '../../api/posts';

const BlogListing1Comp = () => {
    const blogs = useSelector((state) => state.blog.blogItems);
    const dispatch = useDispatch()
    const [activePage, setActivePage] = useState(1);
    const pageSize = 3;

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };
    const totalPages = Math.ceil(posts.length / pageSize);

    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const blogsToShow = posts.slice(startIndex, endIndex);
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-7 mb-6 mb-lg-0">
                            {blogsToShow.map((post, index) => (
                                <div key={index}>
                                <div className="card border-0 shadow bg-transparent">
                                    <img
                                        className="card-img-top"
                                        src={require(`../../assets/images/blog/${post.image.split('/')[3]}`)}
                                        alt="Image1"
                                    />
                                    <div className="card-body p-4">
                                        <div>
                                            <div className="d-inline-block bg-light text-center px-2 py-1 rounded me-2">
                                                <span className="text-primary">{post.date}</span>
                                            </div>{" "}
                                            <Link className="d-inline-block btn-link" to="/blog-single" onClick={() => { dispatch(setSelectedBlog(post.id)) }} >
                                                {post.category}
                                            </Link>
                                        </div>
                                        <h2 className="h5 my-3">
                                            <Link className="link-title" to="/blog-single" onClick={() => { dispatch(setSelectedBlog(post.id)) }} >
                                                {post.title}
                                            </Link>
                                        </h2>
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item pe-3">
                                                {" "}
                                                <a href="/" className="list-group-item-action">
                                                    <i className="lar la-user-circle me-1 text-primary ic-1x" /> {post.author}
                                                </a>
                                            </li>
                                            <li className="list-inline-item pe-3">
                                                {" "}
                                                <a href="/" className="list-group-item-action">
                                                    <i className="las la-eye me-1 text-primary ic-1x" /> {post.views}
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                {" "}
                                                <a href="/" className="list-group-item-action">
                                                    <i className="lar la-comments me-1 text-primary ic-1x" /> {post.comments}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                
                                </div>
                                <hr className='my-5'/>
                                </div>
                            ))}
                            <ProductPagination
                                    activePage={activePage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                        </div>
                        <div className="col-12 col-lg-4 ms-auto">
                            <form className="my-2 my-lg-0 row g-0">
                                <input
                                    className="form-control me-sm-2 col"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <button className="btn btn-primary my-2 my-sm-0 col-auto" type="submit">
                                    Search Blog
                                </button>
                            </form>
                            <div className="mt-5 mb-5 p-4 rounded" style={{ backgroundColor: "#d0faec" }}>
                                <h4 className="mb-3">Recent Stories</h4>
                                {posts.slice(0, 3).map((post, index) => (
                                    <article key={index}>
                                        <div className="row align-items-center mt-2">
                                            <div className="col-sm-4">
                                                <img
                                                    className="rounded img-fluid shadow"
                                                    src={require(`../../assets/images/blog/${post.image.split('/')[3]}`)}
                                                    alt="Image1"
                                                />
                                            </div>
                                            <div className="col-sm-8">
                                                <h5 className="h6">
                                                    <Link className="link-title" to="/blog-single" onClick={() => { dispatch(setSelectedBlog(post.id)) }}>
                                                        {post.title}
                                                    </Link>
                                                </h5>
                                                <a className="d-inline-block text-muted" href="/">
                                                    {post.date}
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <div className="mb-5 p-4 rounded" style={{ backgroundColor: "#ffeff8" }}>
                                <h4 className="mb-3">Categories</h4>
                                <ul className="list-unstyled list-group list-group-flush">
                                    <li className="mb-3"> <a className="list-group-item list-group-item-action border-0" href="/">
                                        All
                                        <span className="badge bg-primary font-weight-normal p-2 rounded float-end">74</span>
                                    </a>
                                    </li>
                                    <li className="mb-3"> <a className="list-group-item list-group-item-action border-0" href="/">
                                        Arts and Entertainment
                                        <span className="badge bg-primary font-weight-normal p-2 rounded float-end">23</span>
                                    </a>
                                    </li>
                                    <li className="mb-3"> <a className="list-group-item list-group-item-action border-0" href="/">
                                        Featured
                                        <span className="badge bg-primary font-weight-normal p-2 rounded float-end">14</span>
                                    </a>
                                    </li>
                                    <li className="mb-3"> <a className="list-group-item list-group-item-action border-0" href="/">
                                        Daily news
                                        <span className="badge bg-primary font-weight-normal p-2 rounded float-end">48</span>
                                    </a>
                                    </li>
                                    <li> <a className="list-group-item list-group-item-action border-0" href="/">
                                        Blog Post
                                        <span className="badge bg-primary font-weight-normal p-2 rounded float-end">32</span>
                                    </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4 rounded" style={{ backgroundColor: "#d3f6fe" }}>
                                <h4 className="mb-3">Tags</h4>
                                <div> <a className="btn-link rounded d-inline-block p-2 bg-white m-1" href="/">AdvocateIron</a>
                                    <a className="btn-link rounded d-inline-block p-2 bg-white m-1" href="/">Web Design</a>
                                    <a className="btn-link rounded d-inline-block p-2 bg-white m-1" href="/">Saas</a>
                                    <a className="btn-link rounded d-inline-block p-2 bg-white m-1" href="/">Corporate</a>
                                    <a className="btn-link rounded d-inline-block p-2 bg-white m-1" href="/">Sass</a>
                                    <a className="btn-link rounded d-inline-block p-2 bg-white m-1" href="/">Software</a>
                                    <a className="btn-link rounded d-inline-block p-2 bg-white m-1" href="/">Landing</a>
                                    <a className="btn-link rounded d-inline-block p-2 bg-white m-1" href="/">Startup</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogListing1Comp;
