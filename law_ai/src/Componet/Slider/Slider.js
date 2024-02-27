import React from 'react'
import OwlCarousel from 'react-owl-carousel';

function Slider() {
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
      <section className="p-0">
        <div className="container">
          <div className="row justify-content-center mt-n15 z-index-1">
            <div className="col-sm-10">
              <div className="bg-white shadow-primary rounded overflow-hidden p-3">
                <div className="item">
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
          </div>
        </div>
      </section>
    </>
  )
}

export default Slider
