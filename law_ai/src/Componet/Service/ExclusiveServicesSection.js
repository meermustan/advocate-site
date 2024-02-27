import React from 'react';
import Img1 from '../../assets/images/svg/01.svg'
import Img2 from '../../assets/images/svg/02.svg'
import Img3 from '../../assets/images/svg/03.svg'
import Img4 from '../../assets/images/svg/04.svg'

const ExclusiveServicesSection = () => {
    return (
        <section className="p-0">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-5 col-md-6 pe-lg-4">
                        <div className="mb-5">
                            <h2 className="mb-0"><span className="font-w-4 d-block">Exclusive services</span> for the next creative project</h2>
                        </div>
                        <div className="px-lg-7 px-4 py-5 rounded bg-white shadow text-center">
                            <div>
                                <img
                                    className="img-fluid"
                                    src={Img1}
                                    alt="img"
                                />
                            </div>
                            <h5 className="mt-4 mb-3">Dashboard</h5>
                            <p className="mb-0">Taking design from AdvocateIron design and typography, contemporary page layouts.</p>
                        </div>
                        <div className="px-lg-7 px-4 py-5 rounded bg-white shadow text-center mt-5">
                            <div>
                            <img
                                    className="img-fluid"
                                    src={Img2}
                                    alt="img"
                                />
                            </div>
                            <h5 className="mt-4 mb-3">Easy to use</h5>
                            <p className="mb-0">Taking design from AdvocateIron design and typography, contemporary page layouts.</p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 ps-lg-4 mt-5 mt-lg-0">
                        <div className="px-lg-7 px-4 py-5 rounded bg-white shadow text-center">
                            <div>
                            <img
                                    className="img-fluid"
                                    src={Img3}
                                    alt="img"
                                />
                            </div>
                            <h5 className="mt-4 mb-3">Clean code</h5>
                            <p className="mb-0">Taking design from AdvocateIron design and typography, contemporary page layouts.</p>
                        </div>
                        <div className="px-lg-7 px-4 py-5 rounded bg-white shadow text-center mt-5">
                            <div>
                            <img
                                    className="img-fluid"
                                    src={Img4}
                                    alt="img"
                                />
                            </div>
                            <h5 className="mt-4 mb-3">User Friendly</h5>
                            <p className="mb-0">Taking design from AdvocateIron design and typography, contemporary page layouts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExclusiveServicesSection;
