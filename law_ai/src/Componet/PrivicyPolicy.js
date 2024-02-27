import React from 'react'
import { Container, Row, Col } from 'reactstrap';

const sectionsData = [
    {
        heading: 'Personal Information',
        content: [
            'Lorem ipsum dolor sit amet, consectetur',
            'Quidem error quae illo excepturi nostrum blanditiis laboriosam',
            'Molestias, eum nihil expedita dolorum odio dolorem',
            'Eum nihil expedita dolorum odio dolorem',
            'Explicabo rem illum magni perferendis',
        ],
    },
    {
        heading: 'Use of User Information',
        content: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, ex, quisquam. Nulla excepturi sint iusto incidunt sed omnis expedita, commodi dolores. Debitis nemo animi quia deleniti commodi nesciunt illo. Deserunt.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, ex, quisquam. Nulla excepturi sint iusto incidunt sed omnis expedita, commodi dolores. Debitis nemo animi quia deleniti commodi nesciunt illo. Deserunt.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, ex, quisquam. Nulla excepturi sint iusto incidunt sed omnis expedita, commodi dolores. Debitis nemo animi quia deleniti commodi nesciunt illo. Deserunt.',
        ],
    },
    {
        heading: 'Disclosure of User Information',
        content: [
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem ullam nostrum dolor alias aspernatur nobis suscipit eaque cumque distinctio eos, beatae deserunt, nihil nam maiores vero, eius harum. Reprehenderit, aspernatur.',
            'Lorem ipsum dolor sit amet, consectetur',
            'Quidem error quae illo excepturi nostrum blanditiis laboriosam',
            'Molestias, eum nihil expedita dolorum odio dolorem',
            'Eum nihil expedita dolorum odio dolorem',
            'Explicabo rem illum magni perferendis',
        ],
    },
];


function Privacy() {
    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col lg="12" md="12">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem error quae illo excepturi nostrum blanditiis laboriosam magnam explicabo.
                            </p>
                            <p>
                                eum nihil expedita dolorum odio dolorem, explicabo rem illum magni perferendis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem error quae illo excepturi nostrum blanditiis laboriosam magnam explicabo. Molestias, eum nihil expedita dolorum odio dolorem, explicabo rem illum magni perferendis.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem error quae illo excepturi nostrum blanditiis laboriosam magnam explicabo. Molestias, eum nihil expedita dolorum odio dolorem, explicabo rem illum magni perferendis.
                            </p>

                            {sectionsData.map((section, index) => (
                                <React.Fragment key={index}>
                                    <h4 className="mt-5 text-primary">{section.heading}</h4>
                                    {section.content.map((item, i) => (
                                        <div className="d-flex align-items-center mb-3" key={i}>
                                            <div className="bg-light rounded p-1">
                                                <i className="las la-check" />
                                            </div>
                                            <p className="mb-0 ms-3">{item}</p>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}

                            <p className="mt-5 mb-0">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, ex, quisquam. Nulla excepturi sint iusto incidunt sed omnis expedita, commodi dolores. Debitis nemo animi quia deleniti commodi nesciunt illo. Deserunt.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Privacy
