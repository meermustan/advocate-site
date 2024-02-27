import React from 'react'
import Background from '../../assets/images/coming-bg.png'
import Timer from './Timer';

function ComingSoon() {
    return (
        <>
            <div className="page-content">
                <section className="fullscreen-banner p-0 o-hidden bg-pos-r bg-dark" style={{
                    height: "100vh",
                    backgroundSize: "100vw 100vh",
                    backgroundImage: `url(${Background})`
                }}>
                    <div className="container-fluid px-md-8 h-100">
                        <div className="row justify-content-center align-items-center h-100">
                            <div className="col-md-8">
                                <div className="coming-soon text-center">
                                    <h1 className="mb-2 font-w-7 text-white">Coming Soon</h1>
                                    <p className="text-light">We Are Creatinig Something Awesome And Exciting For You</p>
                                    <ul className="countdown list-inline d-flex justify-content-between" data-countdown="2022/12/23" />
                                    
                                    <Timer />

                                    <div className="p-4 rounded" style={{ backgroundColor: "rgba(1,164,121,0.2)" }}>
                                        <h4 className="text-white z-index-1 mb-4">Subscribe to get notified!</h4>
                                        <div className="subscribe-form text-center">
                                            <form id="mc-form" className="row mb-3 g-2">
                                                <div className="col-md">
                                                    <input type="text" defaultValue name="NAME" className="name form-control border-0 shadow-sm rounded" id="mc-name" placeholder="Your Name" required />
                                                </div>
                                                <div className="col-md">
                                                    <input type="email" defaultValue name="EMAIL" className="email form-control border-0 shadow-sm rounded mt-3 mt-md-0" id="mc-email" placeholder="Email Address" required />
                                                </div>
                                                <div className="col-md-auto">
                                                    <input className="btn btn-dark mt-3 mt-md-0" type="submit" name="subscribe" defaultValue="Subscribe Now" />
                                                </div>
                                            </form>
                                            <small className="text-light">Get started for 1 Month free trial No Purchace required.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ComingSoon;
