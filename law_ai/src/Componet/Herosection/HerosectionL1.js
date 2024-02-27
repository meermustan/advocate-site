import React from 'react'

function Herosection1() {
  const gototop=()=>{
    window.scrollTo({top:0,behavior:"smooth"})
}
  return (
    <>
      <section className="hero-banner position-relative custom-py-1 hero-shape1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-5 col-xl-6 order-lg-1 mb-8 mb-lg-0">
              {/* <!-- Image --> */}
              <img
                src={require("../../assets/images/hero/01.png")}
                className="img-fluid"
                alt="..."
              />
            </div>
            <div className="col-12 col-lg-7 col-xl-6">
              <h1 className="mb-5">We are here to give the best services</h1>
              {/* <!-- Buttons --> */}
              <div  className="btn btn-primary" onClick={gototop}> Start With Your AdvocateIron </div>
              <blockquote className="mt-5 mb-0 ps-3 border-start border-primary">
                {/* <!-- Text --> */}
                <p className="lead mb-0">
                  Build a Beautiful, Clean & Modern Design website with flexible
                  Bootstrap components.
                </p>
              </blockquote>
            </div>
          </div>
          {/* <!-- / .row --> */}
        </div>
        {/* <!-- / .container --> */}
      </section>
    </>
  )
}

export default Herosection1
