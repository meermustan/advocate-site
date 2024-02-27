import React from 'react'
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { Typewriter } from 'react-simple-typewriter';

function HerosectionL2() {
    const particlesInit = useCallback(async engine => {
        console.log(engine);

        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
    return (
        <div>
            <section className="hero-banner position-relative custom-pb-3 bg-dark z-index-1">
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
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-12 col-lg-7">
                            <h6 className="rounded-pill px-3 py-2 text-dark d-inline-block mb-4 border border-primary text-light"> We Craft Awesome {""}
                                <span className="typer text-primary" >
                                    <Typewriter
                                        words={["Digital", "experience","Software Develop","Creative" ,"Design"]}
                                        loop={6}
                                        cursorStyle='@'
                                        typeSpeed={70}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                    />
                                </span>
                                <span className="cursor" data-owner="some-id">|</span></h6>
                            <h1 className="mb-5 text-white">
                                Unlock Your Technology With Smart AdvocateIron
                            </h1>
                            {/* <!-- Buttons -->  */}
                            <div className="btn btn-white">
                                Start With Your AdvocateIron
                            </div>
                        </div>
                    </div>
                    {/* <!-- / .row --> */}
                </div>
                {/* <!-- / .container --> */}
                <div className="shape-1 bottom overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
                        <path fill="#ffffff" fill-opacity="1" d="M0,32L48,48C96,64,192,96,288,122.7C384,149,480,171,576,170.7C672,171,768,149,864,144C960,139,1056,149,1152,133.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>
        </div>
    )
}

export default HerosectionL2
