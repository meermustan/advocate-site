import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedBlog } from '../../store/reducer/blogReducer';
import posts from '../../api/posts';

const BlogStyle1 = () => {
    const blogs = useSelector((state) => state.blog.blogItems);
    const dispatch = useDispatch()

    return (
        <section>
            <div className="container">
                <div className="row align-items-end mb-5">
                    <div className="col-12 col-md-12 col-lg-4">
                        <div>
                            <h2 className="mb-0">
                                <span className="font-w-4 d-block">From Our Blog</span> List Latest Feed
                            </h2>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-5 ps-lg-5 my-3 my-lg-0">
                        <p className="lead mb-0">
                            AdvocateIron Amazing Landing Page of businesses need access to development resources.
                        </p>
                    </div>
                    <div className="col-12 col-md-12 col-lg-3 text-lg-end">
                        <Link to="/blogs" className="btn btn-primary">
                            View More Post
                        </Link>
                    </div>
                </div>
                <div className="row">
                    {posts.slice(0,3).map((blog) => (
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
            </div>
        </section>
    );
};

export default BlogStyle1;
