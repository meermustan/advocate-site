import React, { useState } from 'react'
import backimg from "../../assets/images/bg/02.png"
import { Col, Container, Row } from 'reactstrap'

function NewsletterL1() {
  const [name, setname] = useState()
  const [email, setemail] = useState()
  function handleChange(e) {
    const value = e.target.value
    setname(value)
  }
  function handleChange2(e) {
    const value = e.target.value
    setemail(value)
  }

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col>
              <div
                className="bg-light bg-pos-l py-6 px-4 px-lg-6 text-center rounded"
                style={{ backgroundImage: `url(${backimg})`, backgroundSize: 'cover' }}
              >
                <div className="mb-5">
                  <h2>
                    <span className="font-w-4 d-block">Subscribe newsletter</span>
                    now for a custom built
                  </h2>
                </div>
                <Row className="justify-content-center">
                  <Col lg={9}>
                    <div className="subscribe-form text-center">
                      <form id="mc-form" className="row mb-3">
                        <div className="col-md">
                          <input
                            type="text"
                            value={name}
                            name="NAME"
                            className="name form-control border-0 shadow-sm rounded"
                            id="mc-name"
                            placeholder="Your Name"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md">
                          <input
                            type="email"
                            value={email}
                            name="EMAIL"
                            className="email form-control border-0 shadow-sm rounded mt-3 mt-md-0"
                            id="mc-email"
                            placeholder="Email Address"
                            required
                            onChange={handleChange2}
                          />
                        </div>
                        <div className="col-md-auto">
                          <input
                            className="btn btn-dark mt-3 mt-md-0"
                            type="submit"
                            name="subscribe"
                            value="Subscribe Now"
                          />
                        </div>
                      </form>
                      <small className="text-dark"
                      >Get started for 1 Month free trial No Purchace
                        required.</small>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  )
}

export default NewsletterL1
