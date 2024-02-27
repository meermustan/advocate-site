import React from 'react'

function Form() {
    return (
        <>
            <section>
                <div className="container">
                    <div className="row mb-5 align-items-end">
                        <div className="col-lg-5 col-12">
                            <div>
                                <h2 className="mb-lg-0"><span className="font-w-4 d-block">Submit your</span> job application</h2>
                            </div>
                        </div>
                        <div className="col-lg-7 col-12">
                            <p className="lead mb-0">We use the latest technologies it voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <form id="contact-form" method="post" action="php/contact.php">
                                <div className="messages" />
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="form_name" type="text" name="name" className="form-control" placeholder="First name" required="required" data-error="Firstname is required." />
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="form_lastname" type="text" name="surname" className="form-control" placeholder="Last name" required="required" data-error="Lastname is required." />
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="form_email" type="email" name="email" className="form-control" placeholder="Email" required="required" data-error="Valid email is required." />
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="form_age" type="tel" name="age" className="form-control" placeholder="Age" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="form_city" type="text" name="name" className="form-control" placeholder="City" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <select className="form-control">
                                                <option selected>Select Position</option>
                                                <option>Web Designer</option>
                                                <option>Developer</option>
                                                <option>Software Engineer</option>
                                                <option>Marketing Manager</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="phone" type="text" name="Phone Number" className="form-control" placeholder="Phone Number" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <select className="form-control">
                                                <option selected>Gender</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <textarea id="form_experience" name="Experience If any" className="form-control" placeholder="Experience If any" rows={4} defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <textarea id="form_message" name="Application " className="form-control" placeholder="Application " rows={4} required="required" data-error="Please,leave us a message." defaultValue={""} />
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mt-3 text-center">
                                        <button className="btn btn-primary">Send Application</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Form
