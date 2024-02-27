import React, { useEffect } from 'react'
import Form2 from './Form'
import { useSelector } from 'react-redux';
import HerosectionHeader from '../../Componet/Herosection/HerosectionHeader';
import posts from '../../api/posts';


function BlogSingle() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    let blog = useSelector((state) => state.blog.selectedBlog);
    const blogs = useSelector((state) => state.blog.blogItems);
    if (!blog) {
        blog = blogs[0].id
    }
    // let selectedBlog = blogs.find((item) => item.id === blog);
    let selectedBlog = posts.find((item) => item.id === blog);
    console.log(selectedBlog);
    return (
        <>
            <HerosectionHeader name={"Blog Single"} />

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {selectedBlog &&
                                <div className="card border-0 bg-transparent">
                                    <img className="card-img-top shadow" src={require(`../../assets/images/blog/${selectedBlog.image.split('/')[3]}`)} alt="Image1" />
                                    <div className="card-body pt-5 px-0">
                                        <div>
                                            <div className="d-inline-block bg-light text-center px-2 py-1 rounded me-2">{selectedBlog.date}</div> <div className="d-inline-block btn-link">{selectedBlog.category}</div>
                                        </div>
                                        <h2 className="h5 my-4">
                                            <div className="link-title">{selectedBlog.title}</div>
                                        </h2>
                                    </div>
                                    
                                    <div dangerouslySetInnerHTML={{ __html: selectedBlog.content }}></div>
                                    
                                    <div className="d-md-flex justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <h6 className="mb-0 me-4">Share It:</h6>
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item"><a className="border rounded px-2 py-1 text-dark" href="/"><i className="la la-facebook" /></a>
                                                </li>
                                                <li className="list-inline-item"><a className="border rounded px-2 py-1 text-dark" href="/"><i className="la la-dribbble" /></a>
                                                </li>
                                                <li className="list-inline-item"><a className="border rounded px-2 py-1 text-dark" href="/"><i className="la la-instagram" /></a>
                                                </li>
                                                <li className="list-inline-item"><a className="border rounded px-2 py-1 text-dark" href="/"><i className="la la-twitter" /></a>
                                                </li>
                                                <li className="list-inline-item"><a className="border rounded px-2 py-1 text-dark" href="/"><i className="la la-linkedin" /></a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="d-flex align-items-center text-md-end mt-5 mt-md-0">
                                            <h6 className="mb-0 me-4">Tags: </h6>
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item"><a className="btn-link rounded d-inline-block p-2 bg-light m-1" href="/">Bootstrap 5</a>
                                                </li>
                                                <li className="list-inline-item"><a className="btn-link rounded d-inline-block p-2 bg-light m-1" href="/">Software</a>
                                                </li>
                                                <li className="list-inline-item"><a className="btn-link rounded d-inline-block p-2 bg-light m-1" href="/">Sass</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-6 shadow p-5">
                                        <div className="mb-4">
                                            <h2>All Comments</h2>
                                        </div>
                                        <div className="row">
                                            <div className="mb-4 mb-md-0 col-md-auto">
                                                <img className="img-fluid rounded shadow" alt="image1" src={require("../../assets/images/thumbnail/01.jpg")} />
                                            </div>
                                            <div className="col-md">
                                                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                                    <h6 className="mb-0">Raymond Lee</h6>  <small className="text-muted">5 Days Ago</small>
                                                </div>
                                                <p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named. Primis veritus contentiones nec ad, nec et tantas semper delicatissimi.</p> <a className="btn btn-primary btn-sm" href="/">Reply</a>
                                            </div>
                                        </div>
                                        <div className="row border p-4 my-5 rounded">
                                            <div className="mb-4 mb-md-0 col-md-auto">
                                                <img className="img-fluid rounded shadow" alt="image2" src={require("../../assets/images/thumbnail/02.jpg")} />
                                            </div>
                                            <div className="col-md">
                                                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                                    <h6 className="mb-0">Dani Karie</h6>  <small className="text-muted">5 Days Ago</small>
                                                </div>
                                                <p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named. Primis veritus contentiones nec ad, nec et tantas semper delicatissimi.</p> <a className="btn btn-primary btn-sm" href="/">Reply</a>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-4 mb-md-0 col-md-auto">
                                                <img className="img-fluid rounded shadow" alt="image3" src={require("../../assets/images/thumbnail/03.jpg")} />
                                            </div>
                                            <div className="col-md">
                                                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                                                    <h6 className="mb-0">Karlo Bond</h6>  <small className="text-muted">5 Days Ago</small>
                                                </div>
                                                <p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named. Primis veritus contentiones nec ad, nec et tantas semper delicatissimi.</p> <a className="btn btn-primary btn-sm" href="/">Reply</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post-comments mt-5">
                                        <div className="mb-4">
                                            <h2>Leave A Comment</h2>
                                        </div>
                                        <Form2 />
                                    </div>
                                    <div />
                                </div>}

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default BlogSingle
