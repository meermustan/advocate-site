import React, { useCallback } from 'react'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles';

function TestimonialL4() {
  const particlesInit = useCallback(async engine => {
    console.log(engine);

    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);
  return (
    <>
      <section className="custom-pt-2 position-relative bg-dark z-index-1">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          options={{
            "fps_limit": '60',
            "fullScreen":
            {
              "enable": false,

            },
            "particles": {
              "number": {
                "value": 160,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#aa0505"
              },

              "shape": {
                "type": "circle",
                "stroke": {
                  "width": 0,
                  "color": "#f94f15"
                },
                "polygon": {
                  "nb_sides": 5
                },

              },

              "opacity": {
                "value": 1,
                "random": true,
                "anim": {
                  "enable": true,
                  "speed": 1,
                  "opacity_min": 0,
                  "sync": false
                }
              },

              "size": {
                "value": 3,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 4,
                  "size_min": 0.3,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 600
                }
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "bubble"
                },
                "onclick": {
                  "enable": true,
                  "mode": "repulse"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 250,
                  "size": 0,
                  "duration": 2,
                  "opacity": 0,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          }}
        />
        <div id="particles-js"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 text-center my-5">
              <h4 className='text-white'>These comments showcase the high satisfaction levels of clients who have used your platform to connect with legal professionals.</h4>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="mb-5">
                <h2 className="mb-0 text-white"><span className="font-w-4 d-block">Hear it from Our </span>Valued Clients</h2>
              </div>
              <div className="card border-0 bg-transparent">
                <div className="card-body p-0"> <i className="las la-quote-left ic-2x text-white bg-primary rounded-circle p-1"></i>
                  <p className="font-w-5 lead my-3 text-light">AdvocateIron Tech's platform has been a game-changer for us. It's incredibly user-friendly and has made finding trustworthy legal professionals a breeze. We appreciate the platform's commitment to professionalism and excellence.</p>
                  <div className="d-flex align-items-center">
                    <div>
                      <img alt="Image1" src={require("../../assets/images/testimonial/01.jpg")} className="img-fluid rounded-circle" />
                    </div>
                    <div className="ms-3">
                      <h5 className="text-primary mb-0">Samantha Khan</h5>
                      <small className="text-muted fst-italic">- Client</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-5 mt-md-0">
              <div className="card border-0 bg-transparent">
                <div className="card-body p-0"> <i className="las la-quote-left ic-2x text-white bg-primary rounded-circle p-1"></i>
                  <p className="font-w-5 lead my-3 text-light">AdvocateIron Tech's platform has been a game-changer for us. It's incredibly user-friendly and has made finding trustworthy legal professionals a breeze. We appreciate the platform's commitment to professionalism and excellence.</p>
                  <div className="d-flex align-items-center">
                    <div>
                      <img alt="Image1" src={require("../../assets/images/testimonial/02.jpg")} className="img-fluid rounded-circle" />
                    </div>
                    <div className="ms-3">
                      <h5 className="text-primary mb-0">Ayesha Malik</h5>
                      <small className="text-muted fst-italic">- Client</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card border-0 bg-transparent mt-5">
                <div className="card-body p-0"> <i className="las la-quote-left ic-2x text-white bg-primary rounded-circle p-1"></i>
                  <p className="font-w-5 lead my-3 text-light">AdvocateIron Tech's platform has been a game-changer for us. It's incredibly user-friendly and has made finding trustworthy legal professionals a breeze. We appreciate the platform's commitment to professionalism and excellence.</p>
                  <div className="d-flex align-items-center">
                    <div>
                      <img alt="Image" src={require("../../assets/images/testimonial/03.jpg")} className="img-fluid rounded-circle" />
                    </div>
                    <div className="ms-3">
                      <h5 className="text-primary mb-0">Usman Ahmed</h5>
                      <small className="text-muted fst-italic">- Client</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-12 text-center my-5">
              <h4 className='text-white'>Certainly, here are testimonials from advocates (lawyers) about their satisfaction with your platform.</h4>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="mb-5">
                <h2 className="mb-0 text-white"><span className="font-w-4 d-block">Here's What Our </span>Legal Professionals <span className="font-w-4 d-block">Say.</span></h2></div>
              <div className="card border-0 bg-transparent">
                <div className="card-body p-0"> <i className="las la-quote-left ic-2x text-white bg-primary rounded-circle p-1"></i>
                  <p className="font-w-5 lead my-3 text-light">AdvocateIron Tech's platform has revolutionized the way we connect with clients. It's efficient, reliable, and provides a steady stream of quality cases. The platform's commitment to professionalism and seamless experience is commendable.</p>
                  <div className="d-flex align-items-center">
                    <div>
                      <img alt="Image1" src={require("../../assets/images/testimonial/01.jpg")} className="img-fluid rounded-circle" />
                    </div>
                    <div className="ms-3">
                      <h5 className="text-primary mb-0">Ali Khan</h5>
                      <small className="text-muted fst-italic">- Advocate</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-5 mt-md-0">
              <div className="card border-0 bg-transparent">
                <div className="card-body p-0"> <i className="las la-quote-left ic-2x text-white bg-primary rounded-circle p-1"></i>
                  <p className="font-w-5 lead my-3 text-light">AdvocateIron Tech's platform has revolutionized the way we connect with clients. It's efficient, reliable, and provides a steady stream of quality cases. The platform's commitment to professionalism and seamless experience is commendable.</p>
                  <div className="d-flex align-items-center">
                    <div>
                      <img alt="Image1" src={require("../../assets/images/testimonial/02.jpg")} className="img-fluid rounded-circle" />
                    </div>
                    <div className="ms-3">
                      <h5 className="text-primary mb-0">Sara Ahmed</h5>
                      <small className="text-muted fst-italic">- Advocate</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-12 text-center mt-5">
              <h4 className='text-white'>These comments reflect the positive feedback from legal professionals who have used your platform to connect with clients and handle cases efficiently.</h4>
            </div>
          </div>
        </div>
        <div className="shape-1 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#fff" fill-opacity="1" d="M0,192L34.3,202.7C68.6,213,137,235,206,224C274.3,213,343,171,411,165.3C480,160,549,192,617,192C685.7,192,754,160,823,138.7C891.4,117,960,107,1029,128C1097.1,149,1166,203,1234,202.7C1302.9,203,1371,149,1406,122.7L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
          </svg>
        </div>
      </section>
    </>
  )
}

export default TestimonialL4
