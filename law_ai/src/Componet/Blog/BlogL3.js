import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedBlog } from '../../store/reducer/blogReducer';

function BlogL3() {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blog.blogItems);
    console.log(blogs);
    return (
        <>
            <section className="bg-dark mt-n10 py-10">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mt-6 mt-md-0">
                            <div>
                                <h2 className="text-white"><span className="font-w-4 d-block">From Our Blog</span> List Latest Feed</h2>
                                <p className="lead mb-0 text-light">AdvocateIron Amazing Landing Page of businesses need access to development resources.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-0 mt-n8">
                <div className="container">
                    {/* <!-- / .row --> */}
                    <div className="row">
                        <div className="col">
                            {/* <!-- Blog Card --> */}
                            {
                                blogs.slice(0, 2).map((blog) => {
                                    return (
                                        <>

                                            <div className="card border-0 flex-md-row align-items-center mb-5">
                                                <div className="col-md-4">
                                                    <img
                                                        className="img-fluid"
                                                        src={require(`../../assets/images/blog/${blog.image.split('/')[3]}`)}
                                                        alt="Image1"
                                                    />
                                                </div>
                                                <div className="card-body col-md-6">
                                                    <div className="d-inline-block  ">
                                                        <span className="text-primary bg-light text-center px-2 py-1 rounded me-2">{blog.date}</span>
                                                        <span className="ms-3">{blog.category}</span>
                                                    </div>
                                                    <h2 className="h5 my-3">
                                                        <Link className="d-inline-block btn-link" to="/blog-single" onClick={() => { dispatch(setSelectedBlog(blog.id)) }}>
                                                            {blog.title}
                                                        </Link>
                                                    </h2>
                                                    <ul className="list-inline mb-0">
                                                        <li className="list-inline-item pe-3"> <a href="/" className="list-group-item-action"><i className="lar la-user-circle me-1 text-primary ic-1x"></i> {blog.author}</a>
                                                        </li>
                                                        <li className="list-inline-item pe-3"> <a href="/" className="list-group-item-action"><i className="las la-eye me-1 text-primary ic-1x"></i> {blog.views}</a>
                                                        </li>
                                                        <li className="list-inline-item"> <a href="/" className="list-group-item-action"><i className="lar la-comments me-1 text-primary ic-1x"></i> {blog.comments}</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-2">
                                                    <Link to="/blogs" className="btn btn-primary">
                                                        Read More
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                            {/* <!-- End Blog Card --> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogL3
