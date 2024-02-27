import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import VideoBox1 from '../VideoBox/videoBox';

const clientLogos = [
    require("../../assets/images/client/09.png"),
    require("../../assets/images/client/10.png"),
    require("../../assets/images/client/11.png"),
    require("../../assets/images/client/12.png"),
    require("../../assets/images/client/13.png"),
    require("../../assets/images/client/14.png"),
];

function MultisecL2() {
    return (
        <section>
            <Container>
                <Row className="align-items-center justify-content-between">
                    <Col lg="5" className='mb-5 mb-lg-0'>
                        <VideoBox1 />
                    </Col>
                    <Col lg="6">
                    <div className="mb-5">
                        <h2><span className="font-w-4 d-block">Perfect Solution</span> For your Small Business</h2>
                        <p className="lead">AdvocateIron Amazing Landing Page of businesses need access to development resources.</p>
                    </div>
                    <Row className="align-items-center">
                        {clientLogos.map((logo, index) => (
                            <Col key={index} md="4" sm="4" xs="6" className={`mt-6 ${index >= 3 ? 'mt-sm-0' : 'mt-sm-0'}`}>
                                <div className="client-logo">
                                    <img className="img-fluid" src={logo} alt={`Client Logo ${index + 1}`} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>
                </Row>
            </Container>
        </section>
    );
}

export default MultisecL2;
