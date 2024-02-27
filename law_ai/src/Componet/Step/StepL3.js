import React from 'react'
import { default as svg5 } from '../../assets/images/svg/05.svg';
import { default as svg6 } from '../../assets/images/svg/06.svg';
import { default as svg7 } from '../../assets/images/svg/07.svg';

function StepL3() {
  return (
    <>
      <section>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="mb-5">
                <h2 className="mb-0"><span className="font-w-4 d-block">Working with AdvocateIron</span> simple three step</h2>
              </div>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-12 col-md-4">
              <div>
                <div className="p-3 rounded bg-white shadow position-relative me-3">
                  <img className="img-fluid" src={svg5} alt="" /> <span className="rotation position-absolute right-0 bottom-0 bg-white shadow rounded px-2 py-1 text-dark h4 fst-italic mb-0 me-n3 mb-n3">01</span>
                </div>
                <h4 className="mt-4 mb-2">Submit Your Task</h4>
                <p className="mb-0 text-light">Taking design from AdvocateIron design and typography, contemporary page layouts.</p>
              </div>
            </div>
            <div className="col-12 col-md-4 mt-5">
              <div>
                <div className="p-3 rounded bg-white shadow position-relative me-3">
                  <img className="img-fluid" src={svg6} alt="" /> <span className="rotation position-absolute right-0 bottom-0 bg-white shadow rounded px-2 py-1 text-dark h4 fst-italic mb-0 me-n3 mb-n3">02</span>
                </div>
                <h4 className="mt-4 mb-2">AdvocateIron Expert</h4>
                <p className="mb-0 text-light">Taking design from AdvocateIron design and typography, contemporary page layouts.</p>
              </div>
            </div>
            <div className="col-12 col-md-4 mt-5 mt-md-0">
              <div>
                <div className="p-3 rounded bg-white shadow position-relative me-3">
                  <img className="img-fluid" src={svg7} alt="" /> <span className="rotation position-absolute right-0 bottom-0 bg-white shadow rounded px-2 py-1 text-dark h4 fst-italic mb-0 me-n3 mb-n3">03</span>
                </div>
                <h4 className="mt-4 mb-2">Result Delivered</h4>
                <p className="mb-0 text-light">Taking design from AdvocateIron design and typography, contemporary page layouts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default StepL3
