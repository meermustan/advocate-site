import React from 'react'

function AboutL1() {
    const gototop=()=>{
      window.scrollTo({top:0,behavior:"smooth"})
  }
  return (
    <>
         <section className="py-5">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-12 col-lg-7 mb-5 mb-lg-0">
                <img
                  src={require("../../assets/images/about/01.png")}
                  alt="Image1"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-12 col-lg-5">
                <div className="mb-5">
                  <h2>
                    <span className="font-w-4 d-block">Perfect Solution</span> For
                    your Small Business
                  </h2>
                  <p className="lead mb-0">
                    We use the latest technologies it voluptatem accusantium
                    doloremque laudantium.
                  </p>
                </div>
                <div className="d-flex align-items-start mb-4">
                  <div className="me-3">
                    <span className="list-dot" style={{backgroundColor:"#aa0505"}}></span>
                  </div>
                  <div>
                    <h6 className="mb-2">Operating Modern Design</h6>
                    <p className="mb-0">
                      Design from AdvocateIron design and typography, contemporary page
                      layouts.
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <span className="list-dot" style={{backgroundColor:"#ffbe30"}} ></span>
                  </div>
                  <div>
                    <h6 className="mb-2">Easy Multi-usable</h6>
                    <p className="mb-0">
                      Design from AdvocateIron design and typography, contemporary page
                      layouts.
                    </p>
                  </div>
                </div>
                <div className="btn btn-outline-primary mt-5" onClick={gototop}>
                  Explore More
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default AboutL1
