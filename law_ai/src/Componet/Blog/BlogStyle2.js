import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedBlog } from '../../store/reducer/blogReducer';

const BlogStyle2 = () => {
    const dispatch = useDispatch()
    const blogData = useSelector((state) => state.blog.blogItems);
    return (
        <section>
            <div className="container"> 
                <div className="row align-items-end mb-5 justify-content-between">
                    <div className="col-12 col-lg-5">
                        <div>
                            <h2 className="mb-0"><span className="font-w-4 d-block">From Our Blog</span> List Latest Feed</h2>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mt-3 my-lg-0">
                        <p className="lead mb-0">AdvocateIron Amazing Landing Page of businesses need access to development resources.</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        {blogData.slice(0,2).map((blog, index) => (
                            <div className="card bg-transparent flex-md-row align-items-center p-md-0 p-3 mt-5" key={index}>
                                <div className="col-md-4">
                                    <img
                                        className="img-fluid"
                                        src={require(`../../assets/images/blog/${blog.image.split('/')[3]}`)}
                                        alt="Image1"
                                    />
                                </div>
                                <div className="card-body col-md-6">
                                    <div>
                                        <div className="d-inline-block bg-light text-center px-2 py-1 rounded me-2">
                                            <span className="text-primary">{blog.date}</span>
                                        </div>
                                        <Link className="d-inline-block btn-link" to="/blog-single" onClick={() => { dispatch(setSelectedBlog(blog.id)) }}>{blog.category}</Link>
                                    </div>
                                    <h2 className="h5 my-3" >
                                        <Link className="link-title" to="/blog-single" onClick={() => { dispatch(setSelectedBlog(blog.id)) }}>{blog.title}</Link>
                                    </h2>
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item pe-3">
                                            <Link to="/" className="list-group-item-action">
                                                <i className="lar la-user-circle ms-1 text-primary ic-1x"></i> {blog.author}
                                            </Link>
                                        </li>
                                        <li className="list-inline-item pe-3">
                                            <Link to="/" className="list-group-item-action">
                                                <i className="las la-eye ms-1 text-primary ic-1x"></i> {blog.views}
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="/" className="list-group-item-action">
                                                <i className="lar la-comments ms-1 text-primary ic-1x"></i> {blog.comments}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-2">
                                    <Link to="/blogs" className="btn btn-primary">Read More</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogStyle2;
