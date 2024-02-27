import React from 'react';

const FeatureSection3 = () => {
  return (
    <section>
      <div className="container">
        <div className="row align-items-center mt-6">
          <div className="col-lg-4 col-md-6">
            <div className="p-5" style={{ backgroundColor: '#aa05052c' }}>
              <div className="f-icon">
                {/* Replace "flaticon-prototype-1" with the actual class for the prototype icon */}
                <i className="flaticon-prototype-1"></i>
              </div>
              <h5 className="mt-4 mb-3">Awesome Design</h5>
              <p className="mb-0">
                Taking design from AdvocateIron design and typography, contemporary page layouts.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
            <div className="p-5" style={{ backgroundColor: '#ffeff8' }}>
              <div className="f-icon">
                {/* Replace "flaticon-lightbulb" with the actual class for the lightbulb icon */}
                <i className="flaticon-lightbulb"></i>
              </div>
              <h5 className="mt-4 mb-3">Easy to Use</h5>
              <p className="mb-0">
                Taking design from AdvocateIron design and typography, contemporary page layouts.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
            <div className="p-5" style={{ backgroundColor: '#d3f6fe' }}>
              <div className="f-icon">
                {/* Replace "flaticon-friendship" with the actual class for the friendship icon */}
                <i className="flaticon-friendship"></i>
              </div>
              <h5 className="mt-4 mb-3">User Friendly</h5>
              <p className="mb-0">
                Taking design from AdvocateIron design and typography, contemporary page layouts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection3;

