import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import { Row, Col } from 'reactstrap';

function Service() {
  const teamMembers = [
    {

      image: require("../../assets/images/app/001.jpeg"),
    },
    {

      image: require("../../assets/images/app/002.jpeg"),
    },
    {

      image: require("../../assets/images/app/003.jpeg"),
    },
    {

      image: require("../../assets/images/app/004.jpeg"),
    }
  ]
  const featuresData = [
    {
      icon: 'flaticon-dashboard',
      bgColor: '#d0faec',
      title: 'Approved IDs for Clients and Advocates',
      head: "Building Trust with a Track Record ",
      description: `AdvocateIron Tech ensures that both clients and advocates have verified profiles with a history of past collaborations and cases. This transparency fosters trust within our community`,
    },
    {
      icon: 'flaticon-relationship',
      bgColor: '#ffeff8',
      title: 'Client Reviews and 5-Star Ratings',
      head: "Empowering Informed Choices ",
      description: "Our platform allows clients to review and rate their advocate's services. These 5-star ratings and reviews help clients make informed decisions when choosing legal professionals.",
    },
    {
      icon: 'flaticon-solution',
      bgColor: '#d3f6fe',
      title: 'Collaboration History',
      head: "",
      description: 'Our platform maintains a detailed record of past collaborations and cases between clients and advocates. This history fosters transparency, builds trust, and enables users to make well-informed decisions when seeking legal assistance',
    },
    {
      icon: 'flaticon-system',
      bgColor: '#fff5d9',
      title: '24/7 Meeting Support Bot',
      head:"Enhance Case Data Collection",
      description: 'At AdvocateIron Tech, we provide a 24/7 Meeting Support Bot dedicated to helping your clients gather crucial case data. This bot serves as a valuable assistant to lawyers, answering questions and facilitating seamless data collection during meetings.',
    }
  ];

  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <h2 className="mb-0 text-center"><span className="font-w-4 d-block">AdvocateIron tech build trust between </span> Client & Advocate.</h2>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 col-12 order-lg-1 mt-5 mb-lg-0 overflow-hidden">
              <OwlCarousel
                className="owl-carousel no-pb"
                dotData={false}
                items={1}
                autoplay={true}
                //margin={30}
                dots={false}
                loop={true}
                //height={1000}
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
                  <div className="item">
                    <div key={index} className='p-3 m-5 shadow rounded'>
                      <img className="img-fluid" src={member.image} alt="" />
                    </div>
                  </div>
                ))
                }
              </OwlCarousel>
            </div>
            <div className="col-lg-6 col-12">
              <Row>
                {featuresData.map((feature, index) => (
                  <Col key={index} md="12" className={`mt-5`}>
                    <div className="d-flex">
                      <div className="me-3">
                        <div className={`f-icon-s p-3 rounded`} style={{ backgroundColor: feature.bgColor }}>
                          <i className={feature.icon}></i>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-2">{feature.title}</h5>
                        <p className="mb-0"><span style={{ fontWeight: "600" }}>{feature.head}</span> {feature.description}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Service