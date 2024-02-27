import React from 'react'

function FeatureL1() {
  const gototop=()=>{
    window.scrollTo({top:0,behavior:"smooth"})
}
    return (
      <>
         <section>
          <div className="container">
            <div
              className="row justify-content-between align-items-center mb-4 mb-lg-0"
            >
              <div className="col-lg-6 col-md-5">
                <div>
                  <h2>
                    <span className="font-w-4 d-block"
                      >We focus on your business</span>
                    need and provide best
                  </h2>
                  <p className="lead">
                    We use the latest technologies it voluptatem accusantium
                    doloremque laudantium, totam rem aperiam.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-7">
                <div className="p-5 feature-hover active position-relative">
                  <div className="f-icon"><i className="flaticon-prototype"></i></div>
                  {/* <img src={require("../../../../assets/icon/feedback.png")} className='cimg' /> */}
                  <h5 className="mt-4 mb-3">Design & Creativity</h5>
                  <p className="mb-0">
                    Taking design from AdvocateIron design and typography, contemporary
                    page layouts.
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt-lg-n5 align-items-center">
              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div className="p-5 feature-hover position-relative">
                  <div className="f-icon"><i className="flaticon-knowledge"></i></div>
                  <h5 className="mt-4 mb-3">Technology Innovation</h5>
                  <p className="mb-0">
                    Taking design from AdvocateIron design and typography, contemporary
                    page layouts.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div className="p-5 feature-hover position-relative">
                  <div className="f-icon"><i className="flaticon-thumbs-up"></i></div>
                  <h5 className="mt-4 mb-3">Digital Marketing</h5>
                  <p className="mb-0">
                    Taking design from AdvocateIron design and typography, contemporary
                    page layouts.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-12 text-center">
                <div className="btn btn-primary mt-lg-8" onClick={gototop}>
                  View All Services
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
}

export default FeatureL1
