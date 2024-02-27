import React from 'react';
import CountUp from 'react-countup';

const CounterSection = () => {
  return (
    <section>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <div className="mb-5">
              <h2><span className="font-w-4 d-block">Discover even</span> more possibility with AdvocateIron</h2>
              <p className="lead mb-0">We use the latest technologies it voluptatem accusantium doloremque laudantium.</p>
            </div>
          </div>
        </div>
        <div className="row align-items-center text-center">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="counter">
              <div className="counter-desc text-dark">
                <CountUp start={0} end={28} duration={5} suffix="+" className='count-number h2'/>
                <h6 className="text-muted mb-0">Project Completed</h6>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 mt-4 mt-sm-0">
            <div className="counter">
              <div className="counter-desc text-dark">
                <CountUp start={0} end={50} duration={5} suffix="+" className='count-number h2'/>
                <h6 className="text-muted mb-0">Support Member</h6>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 mt-4 mt-lg-0">
            <div className="counter">
              <div className="counter-desc text-dark">
                <CountUp start={0} end={99} duration={5} suffix="+" className='count-number h2' />
                <h6 className="text-muted mb-0">People Love Us</h6>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 mt-4 mt-lg-0">
            <div className="counter">
              <div className="counter-desc text-dark">
                <CountUp start={0} end={120} duration={5} suffix="+" className='count-number h2' />
                <h6 className="text-muted mb-0">Happy Customers</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
