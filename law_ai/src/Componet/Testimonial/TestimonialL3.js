import React from 'react'
function TestimonialL3() {
    const data = [
        {
            img: require("../../assets/images/testimonial/01.jpg"),
            details: "AdvocateIron Amazing Landing Page All-in-one, clean code, Crative & Modern design Professional Recommended crofessional and great experience.",
            icon: "las la-quote-left ic-2x text-white bg-primary rounded-circle p-1",
            name: "Romi Jensen",
            role: "- Founder",
        }
    ]
    return (
        <>
            {data.map((item) => {
                return (<>


                    <section className="pb-0">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <div className="mb-5">
                                        <h2 className="mb-0"><span className="font-w-4 d-block">Working with AdvocateIron</span> simple three step</h2>
                                    </div>
                                    <div className="card p-3 p-md-5 border-0 bg-white shadow">
                                        <div className="card-body p-0"> <i className={item.icon}></i>
                                            <p className="font-w-5 lead my-3">AdvocateIron Amazing Landing Page All-in-one, clean code, Crative &amp; Modern design Professional Recommended crofessional and great experience.</p>
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <img alt="Image1" src={item.img} className="img-fluid rounded-circle" />
                                                </div>
                                                <div className="ms-3">
                                                    <h5 className="text-primary mb-0">{item.name}</h5>
                                                    <small className="text-muted fst-italic">{item.role}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-5 mt-md-0">
                                    <div className="card p-3 p-md-5 border-0 bg-light">
                                        <div className="card-body p-0"> <i className={item.icon}></i>
                                            <p className="font-w-5 lead my-3">AdvocateIron Amazing Landing Page All-in-one, clean code, Crative &amp; Modern design Professional Recommended crofessional and great experience.</p>
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <img alt="Image1" src={item.img} className="img-fluid rounded-circle" />
                                                </div>
                                                <div className="ms-3">
                                                    <h5 className="text-primary mb-0">{item.name}</h5>
                                                    <small className="text-muted fst-italic">{item.role}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card p-3 p-md-5 border-0 bg-dark mt-5">
                                        <div className="card-body p-0"> <i className="las la-quote-left ic-2x text-white bg-primary rounded-circle p-1"></i>
                                            <p className="font-w-5 lead my-3 text-light">AdvocateIron Amazing Landing Page All-in-one, clean code, Crative &amp; Modern design Professional Recommended crofessional and great experience.</p>
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <img alt="Image1" src={item.img} className="img-fluid rounded-circle" />
                                                </div>
                                                <div className="ms-3">
                                                    <h5 className="text-primary mb-0">{item.name}</h5>
                                                    <small className="text-muted fst-italic">{item.role}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>)
            })}
        </>
    )
}

export default TestimonialL3
