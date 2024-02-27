import React from 'react'

function Map() {
    return (
        <>
            <section >
                <div className='container'>
                    <div className='row'>
                        <div className="col-12 col-lg-7">
                            <div>
                                <div>
                                    <h2><span className="font-w-4 d-block">Contact Us</span> now for your queries</h2>
                                </div>
                                <form id="contact-form" className="row" method="post" action="php/contact.php">
                                    <div className="messages" />
                                    <div className="form-group col-md-6">
                                        <input id="form_name" type="text" name="name" className="form-control" placeholder="First Name" required="required" data-error="Name is required." />
                                        <div className="help-block with-errors" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input id="form_name1" type="text" name="name" className="form-control" placeholder="Last Name" required="required" data-error="Name is required." />
                                        <div className="help-block with-errors" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input id="form_email" type="email" name="email" className="form-control" placeholder="Email" required="required" data-error="Valid email is required." />
                                        <div className="help-block with-errors" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input id="form_phone" type="tel" name="phone" className="form-control" placeholder="Phone" required="required" data-error="Phone is required" />
                                        <div className="help-block with-errors" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <input id="form_subject" type="tel" name="subject" className="form-control" placeholder="Subject" required="required" data-error="Subject is required" />
                                        <div className="help-block with-errors" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <textarea id="form_message" name="message" className="form-control h-auto" placeholder="Message" rows={4} required="required" data-error="Please,leave us a message." defaultValue={""} />
                                        <div className="help-block with-errors" />
                                    </div>
                                    <div className="col mt-4">
                                        <button className="btn btn-primary">Send Messages</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 ms-auto mt-5 mt-lg-0">
                            <div className="d-flex align-items-center bg-white p-3 shadow-sm rounded mb-3">
                                <div className="me-3">
                                    <div className="f-icon-s p-3 rounded" style={{ backgroundColor: "#d0faec" }}> <i className="flaticon-location"></i>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="mb-1">Address:</h5>
                                    <span className="text-black">Karachi, Punjab Pakistan</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center bg-white p-3 shadow-sm rounded  mb-3">
                                <div className="me-3">
                                    <div className="f-icon-s p-3 rounded" style={{ backgroundColor: "#d0faec" }}> <i className="flaticon-mail"></i>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="mb-1">Email Us:</h5>
                                    <a className="btn-link" href="mailto:advocateiron.tech@gmail.com">advocateiron.tech@gmail.com</a>
                                </div>
                            </div>
                            <div className="d-flex align-items-center bg-white p-3 shadow-sm rounded">
                                <div className="me-3">
                                    <div className="f-icon-s p-3 rounded" style={{ backgroundColor: "#d0faec" }}> <i className="flaticon-telephone"></i>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="mb-1">Call Us:</h5>
                                    <a className="btn-link" href="tel:+912345678900">+92 300 1115732</a>
                                </div>
                            </div>
                            <div className='map h-50 mt-5'>
                                <iframe title='Wink' className="w-100 h-100 border-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30826.157817398267!2d67.01001491117901!3d24.86476759804354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1701106485311!5m2!1sen!2s" allowfullscreen=""></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Map
