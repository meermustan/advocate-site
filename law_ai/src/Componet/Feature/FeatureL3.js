import React from 'react'
import { default as svg1 } from '../../assets/images/svg/01.svg'
import { default as svg2 } from '../../assets/images/svg/02.svg';
import { default as svg3 } from '../../assets/images/svg/03.svg';
import { default as svg4 } from '../../assets/images/svg/04.svg';

function FeatureL3() {
  const data1 = [
    {
      service: "Dashboard",
      details: "Taking design from AdvocateIron design and typography, contemporary page layouts.",
      img: svg1,
    },
    {
      service: "Easy to use",
      details: "Taking design from AdvocateIron design and typography, contemporary page layouts.",
      img: svg2,
    },


  ]
  const data2 = [
    {
      service: "Clean code",
      details: "Taking design from AdvocateIron design and typography, contemporary page layouts.",
      img:svg3,
    },
    {
      service: "User Friendly",
      details: "Taking design from AdvocateIron design and typography, contemporary page layouts.",
      img: svg4,
    },
  ]
  return (
    <>
      <section className="p-0">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-5 col-md-6 pe-lg-4">
              <div className="mb-5">
                <h2 className="mb-0"><span className="font-w-4 d-block">Exclusive services</span> for the next creative  project</h2>
              </div>
              {
                data1.map((item) => {
                  return (
                    <>
                      <div className="px-lg-7 px-4 py-5 rounded bg-white shadow text-center mb-5">
                        <div>
                          <img className="img-fluid" src={item.img} alt="" />
                        </div>
                        <h5 className="mt-4 mb-3">{item.service}</h5>
                        <p className="mb-0">{item.details}</p>
                      </div>
                    </>
                  )
                }
                )
              }

            </div>
            <div className="col-lg-5 col-md-6 ps-lg-4 mt-5 mt-lg-0">
            {
              data2.map((item)=>{
                return(
                  <>
                  <div className="px-lg-7 px-4 py-5 rounded bg-white shadow text-center mb-5">
                <div>
                  <img className="img-fluid" src={item.img} alt="" />
                </div>
                <h5 className="mt-4 mb-3">{item.service}</h5>
                <p className="mb-0">{item.details}</p>
              </div>
                  </>
                )
              })
            }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FeatureL3
