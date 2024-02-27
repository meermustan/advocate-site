import React from 'react';
import CountUp from 'react-countup';

const TrustedPeopleSection = () => {
  return (
    <section>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4">
            <div>
              <h2 className="mb-0"><span className="font-w-4 d-block">Trusted people</span> with AdvocateIron</h2>
            </div>
          </div>
          <div className="col-lg-8 mt-3 mt-lg-0">
            <div className="row align-items-center">
              <div className="col-12 col-sm-4">
                <div className="counter">
                  <div className="counter-desc">
                    <CountUp start={0} end={50} duration={5} suffix="+" className="count-number h2 text-primary" />
                    <span className="h2 text-primary">+</span>
                    <h6 className="text-muted mb-0">Support Member</h6>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-2 mt-sm-0">
                <div className="counter">
                  <div className="counter-desc">
                    <CountUp start={0} end={99} duration={5} suffix="+" className="count-number h2 text-primary" />
                    <span className="h2 text-primary">+</span>
                    <h6 className="text-muted mb-0">People Love Us</h6>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-2 mt-sm-0">
                <div className="counter">
                  <div className="counter-desc">
                    <CountUp start={0} end={120} duration={5} suffix="+" className="count-number h2 text-primary" />
                    <span className="h2 text-primary">+</span>
                    <h6 className="text-muted mb-0">Happy Customers</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPeopleSection;
