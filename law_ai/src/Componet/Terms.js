import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const sectionsData = [
    {
        heading: '1. Description of Service',
        content: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, distinctio iste praesentium totam quasi tempore, magnam ipsum cum animi at fuga alias harum quo quibusdam odit eum reprehenderit consectetur suscipit!',
        ],
    },
    {
        heading: '2. Your Registration Obligations',
        content: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio nesciunt officia culpa nostrum maxime vero architecto, corporis placeat repudiandae minima facere animi, pariatur fugit dignissimos qui error est nulla. Doloribus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio nesciunt officia culpa nostrum maxime vero architecto, corporis placeat repudiandae minima facere animi, pariatur fugit dignissimos qui error est nulla. Doloribus.',
        ],
    },
    {
        heading: '3. User Account, Password, and Security',
        content: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, distinctio iste praesentium totam quasi tempore, magnam ipsum cum animi.',
        ],
    },
    {
        heading: '4. User Conduct',
        content: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, distinctio iste praesentium totam quasi tempore, magnam ipsum cum animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium vel recusandae ad impedit ipsum, vitae facere expedita! Voluptatem iure dolorem dignissimos nisi magni a dolore, et inventore optio, voluptas, obcaecati.',
        ],
        checkList: [
            'Lorem ipsum dolor sit amet, consectetur',
            'Quidem error quae illo excepturi nostrum blanditiis laboriosam',
            'Molestias, eum nihil expedita dolorum odio dolorem',
            'Eum nihil expedita dolorum odio dolorem',
            'Explicabo rem illum magni perferendis',
        ],
    },
    {
        heading: '5. International Use',
        content: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, distinctio iste praesentium totam quasi tempore, magnam ipsum cum animi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium vel recusandae ad impedit ipsum, vitae facere expedita! Voluptatem iure dolorem dignissimos nisi magni a dolore, et inventore optio, voluptas, obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate incidunt aliquam sint, magnam excepturi quas a, id doloremque quasi iusto quo consequuntur dolorum neque optio ipsum, rerum nesciunt illo iure.',
        ],
    },
];

const Terms = () => {
    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col lg="12" md="12">
                            {sectionsData.map((section, index) => (
                                <React.Fragment key={index}>
                                    <h4 className="text-primary">{section.heading}</h4>
                                    {section.content.map((paragraph, pIndex) => (
                                        <p key={pIndex} className="mb-3">
                                            {paragraph}
                                        </p>
                                    ))}
                                    {section.checkList && section.checkList.map((item, iIndex) => (
                                        <div className="d-flex align-items-center mb-3" key={iIndex}>
                                            <div className="bg-light rounded p-1">
                                                <i className="las la-check" />
                                            </div>
                                            <p className="mb-0 ms-3">{item}</p>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                            <a className="btn btn-primary me-1" href="/">
                                Accept
                            </a>
                            <a className="btn btn-outline-primary" href="/">
                                Close
                            </a>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Terms;
