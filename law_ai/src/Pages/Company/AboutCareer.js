import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const careerData = [
  {
    number: '01',
    title: 'Work From Home',
    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model infancy.',
  },
  {
    number: '02',
    title: 'Office An Great Location',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia Neque porro est.',
  },
  {
    number: '03',
    title: 'Shared Success',
    description: 'Officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et non recusandae.',
  },
  {
    number: '04',
    title: 'Medical insurance',
    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model infancy.',
  },
  {
    number: '05',
    title: 'Regular Reviews',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia Neque porro est.',
  },
  {
    number: '06',
    title: 'Bonus Available',
    description: 'Officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et non recusandae.',
  },
];

function AboutCareer() {
  return (
    <section>
      <Container>
        <Row>
          {careerData.map((item, index) => (
            <Col key={index} md="4">
              <h5>
                <span className="text-primary font-w-7">{item.number}.</span> {item.title}
              </h5>
              <p>{item.description}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default AboutCareer;
