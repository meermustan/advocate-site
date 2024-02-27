import React from 'react'
import { Link } from 'react-router-dom'

function Login2() {
    return (
        <>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="bg-white shadow rounded p-4">
                                <h2 className="text-center mb-3">Sign In</h2>
                                <form id="contact-form" method="post" action="php/contact.php">
                                    <div className="messages" />
                                    <div className="form-group">
                                        <label>User Name</label>
                                        <input id="form_name" type="text" name="name" className="form-control" placeholder="User name" required="required" data-error="Username is required." />
                                        <div className="help-block with-errors" />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input id="form_password" type="password" name="password" className="form-control" placeholder="Password" required="required" data-error="password is required." />
                                        <div className="help-block with-errors" />
                                    </div>
                                    <div className="form-group mt-4 mb-5">
                                        <div className="remember-checkbox d-flex align-items-center justify-content-between">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" defaultValue id="check1" />
                                                <label className="form-check-label" htmlFor="check1">Remember me</label>
                                            </div> <a href="/">Forgot Password?</a>
                                        </div>
                                    </div> <Link to="/" className="btn btn-primary">Login Now</Link>
                                </form>
                                <div className="d-flex align-items-center text-center justify-content-center mt-4"> <span className="text-muted me-1">Don't have an account?</span>
                                    <Link to="/sign_up">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login2
