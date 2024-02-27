import React from 'react'
const cardsData = [
  {
    type: 'Basic',
    price: 23,
    btnColor: 'primary',
    imgSrc: 'icon/01.svg',
    features: [
      'Free Custom Domain',
      'Flexible, simple license',
      'Monthly updates',
      'Optimized for mobile',
      'Outstanding Support',
    ],
  },
  {
    type: 'Standard',
    price: 77,
    btnColor: 'dark',
    imgSrc: 'icon/01.svg',
    features: [
      'Unlimited Domain',
      'Flexible, simple license',
      'Monthly updates',
      'Optimized for mobile',
      'Outstanding Support',
    ],
  },
  {
    type: 'Premium',
    price: 99,
    btnColor: 'primary',
    imgSrc: 'icon/02.svg',
    features: [
      'Unlimited Domain',
      'Flexible, simple license',
      'Monthly updates',
      'Optimized for mobile',
      'Outstanding Support',
    ],
  },
];

const Card = ({ type, price, btnColor, imgSrc, features }) => {
  return (
    <div className="col-12 col-lg-4 col-md-6 mb-5 mb-lg-0">
      <div className="card bg-white border-0 shadow">
        <div className="card-body py-5 px-4">
          <img className="img-fluid" src={require(`../../assets/images/${imgSrc}`)} alt="" />
          <div className={`my-4${type === 'Standard' ? ' bg-dark p-3 rounded' : ''}`}>
            <span className={`h2${type === 'Standard' ? ' text-white' : ' text-dark'}`}>{type}</span>
            <p className={`mb-0 text-light${type === 'Premium' ? ' text-dark' : ' text-white'}`}>Perfect For Small Business</p>
          </div>
          {features.map((feature, index) => (
            <div className="d-flex align-items-center mb-2" key={index}>
              {type !== 'Standard' ? (
                <div className="me-2">
                  <i className="las la-check-circle text-primary"></i>
                </div>
              ) : (
                <div className="me-2">
                  <i className="las la-times-circle text-danger"></i>
                </div>
              )}
              <p className={`mb-0${type === 'Premium' ? ' text-light' : ''}`}>{feature}</p>
            </div>
          ))}
          <div className="d-flex justify-content-between align-items-center mt-5 pt-5 border-top">
            <div className="d-flex align-items-start justify-content-center">
              <span className="text-muted mt-2">$</span>
              <span className={`price display-4 font-w-6 text-primary mb-0${type === 'Premium' ? ' text-light' : ''}`}>{price}</span>
              <span className={`text-muted h4 mb-1 align-self-end${type === 'Premium' ? ' text-light' : ''}`}>/mo</span>
            </div>
            <a href="/" className={`btn btn-${btnColor}`}>
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
function PricingL3() {
  return (
    <>
      <section className="pb-0">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="mb-5">
                <h2><span className="font-w-4 d-block">Simple, Fair and</span> affordable prices for all.</h2>
                <p className="lead mb-0">We use the latest technologies it voluptatem accusantium doloremque laudantium.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="position-relative bg-light pt-0 z-index-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 z-index-1">
              <div className="row align-items-center">
                {cardsData.map((card, index) => (
                  <Card key={index} {...card} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="shape-1 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,160C384,192,480,224,576,202.7C672,181,768,107,864,69.3C960,32,1056,32,1152,80C1248,128,1344,224,1392,272L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
      </section>
    </>
  )
}

export default PricingL3
