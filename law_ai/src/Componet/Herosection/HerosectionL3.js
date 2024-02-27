import React from 'react'
import OwlCarousel from 'react-owl-carousel'

function HerosectionL3() {
    const teamMembers = [
        {

            image: require("../../assets/images/about/02.jpg"),
        },
        {

            image: require("../../assets/images/about/03.jpg"),
        },

    ]
    return (
        <>
            <section className="hero-banner position-relative hero-shape2 custom-py-1 overflow-hidden">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-12 col-lg-5">
                            <h1 className="mb-4 font-w-4">
                                AdvocateIron help you work <span className="font-w-6 text-primary">smarter</span>, not <span className="font-w-6 text-primary">harder</span>
                            </h1>
                            <p className="lead mb-4">Build a Beautiful, Clean &amp; Modern Design website with flexible Bootstrap components.</p>
                            {/* <!-- Buttons --> */}
                            <a href="/" className="btn btn-primary">
                                Start Now
                            </a>
                        </div>
                        <div className="col-12 col-lg-6 mt-5 mt-lg-0">
                            <div className='bg-white shadow-primary rounded overflow-hidden p-3 me-lg-n8'>
                                <OwlCarousel
                                    className="owl-carousel"
                                    dotData={false}
                                    items={2}
                                    autoplay={true}
                                    margin={30}
                                    dots={false}
                                    loop={true}
                                    height={1000}
                                    responsive={{
                                        0: {
                                            items: 1 // Show 1 item for screens with width less than or equal to 0px (mobile screens)
                                        },
                                        768: {
                                            items: 1 // Show 3 items for screens with width greater than or equal to 768px (larger screens)
                                        }
                                    }}
                                >
                                    {teamMembers.map((member, index) => (
                                        <div key={index}>
                                            <img className="img-fluid border border-light" src={member.image} alt="" />
                                        </div>
                                    ))
                                    }
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                    {/* <!-- / .row --> */}
                </div>
                {/* <!-- / .container --> */}
            </section>
        </>
    )
}

export default HerosectionL3
