import React from 'react';
import CountUp from 'react-countup';

function MultisecL1() {
  const logos = [
    { imageUrl: require('../../assets/images/client/09.png'), backgroundColor: '#d0faec' },
    { imageUrl: require('../../assets/images/client/10.png'), backgroundColor: '#ffeff8' },
    { imageUrl: require('../../assets/images/client/11.png'), backgroundColor: '#d3f6fe' },
    { imageUrl: require('../../assets/images/client/12.png'), backgroundColor: '#fff5d9' },
    { imageUrl: require('../../assets/images/client/13.png'), backgroundColor: '#ffdeeb' },
  ];

  const counters = [
    { count: 28, duration: 10, label: 'Project Completed' },
    { count: 50, duration: 6, label: 'Support Member' },
    { count: 99, duration: 5, label: 'People Love Us' },
    { count: 120, duration: 3, label: 'Happy Customers' },
  ];

  return (
    <>
      <section>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="mb-5">
                <h2>
                  <span className="font-w-4 d-block">Discover even</span> more possibility with AdvocateIron
                </h2>
                <p className="lead mb-0">
                  We use the latest technologies it voluptatem accusantium doloremque laudantium.
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            {logos.map((logo, index) => (
              <div key={index} className="col-md col-sm-4 mt-4 mt-sm-0">
                <div
                  className="client-logo py-5 px-3 text-center rounded"
                  style={{ backgroundColor: logo.backgroundColor }}
                >
                  <img className="img-fluid" src={logo.imageUrl} alt="" />
                </div>
              </div>
            ))}
          </div>
          <div className="row align-items-center text-center mt-5">
            {counters.map((counter, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-3">
                <div className="counter">
                  <div className="counter-desc text-dark">
                    <CountUp className="count-number h2" end={counter.count} duration={counter.duration} />
                    <span className="h2">+</span>
                    <h6 className="text-muted mb-0">{counter.label}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default MultisecL1;
