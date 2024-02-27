import React, { useState } from 'react';
import { Col, Nav, NavItem, NavLink, TabContent, TabPane, Row } from 'reactstrap';

function OpenPosition() {
    const [activeTab, setActiveTab] = useState('tab1-1');

    const toggleTab = (tabId) => {
        if (activeTab !== tabId) {
            setActiveTab(tabId);
        }
    };

    return (
        <>
            <section>
                <div className="container">
                    {/* ... (rest of the code) ... */}
                    <div className="col">
                        <Row className="tab row">
                            <Col lg="4">
                                <Nav tabs className="nav nav-tabs bg-white shadow border-0 p-4">
                                    <NavItem className="w-100">
                                        <NavLink
                                            className={`nav-item nav-link mb-4 mx-0 ${activeTab === 'tab1-1' ? 'active' : ''}`}
                                            onClick={() => toggleTab('tab1-1')}
                                        >
                                            Designer
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="w-100">
                                        <NavLink
                                            className={`nav-item nav-link w-100 mb-4 mx-0 ${activeTab === 'tab1-2' ? 'active' : ''}`}
                                            onClick={() => toggleTab('tab1-2')}
                                        >
                                            PHP Web Developer
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="w-100">
                                        <NavLink
                                            className={`nav-item nav-link w-100 mb-4 mx-0 ${activeTab === 'tab1-3' ? 'active' : ''}`}
                                            onClick={() => toggleTab('tab1-3')}
                                        >
                                            Marketing Manager
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="w-100">
                                        <NavLink
                                            className={`nav-item nav-link w-100 mb-4 mx-0 ${activeTab === 'tab1-4' ? 'active' : ''}`}
                                            onClick={() => toggleTab('tab1-4')}
                                        >
                                            Front-End Web Developer
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Col>
                            <Col lg="8" mt="5 mt-lg-0">
                                <TabContent activeTab={activeTab} id="nav-tabContent">
                                    <TabPane tabId="tab1-1">
                                        <h5>Job Descriptions:</h5>
                                        <p>Get in touch with us and we’ll figure out something that works for everyone Consulterz discovering the source behind the ubiquitous filler text. In seeing a sample of lorem ipsum, his interest was piqued by consectetur</p>
                                        <h5 className="mt-5 mb-4">Desired Skills:</h5>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="bg-light rounded p-1"> <i className="las la-check" /></div>
                                            <p className="mb-0 ms-3">It has survived not only five centuries, leap typesetting</p>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="bg-light rounded p-1"> <i className="las la-check" /></div>
                                            <p className="mb-0 ms-3">AdvocateIron discovering the source behind the ubiquitous</p>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="bg-light rounded p-1"> <i className="las la-check" /></div>
                                            <p className="mb-0 ms-3">The smartest thing to do with your Landing</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="bg-light rounded p-1"> <i className="las la-check" /></div>
                                            <p className="mb-0 ms-3">I will give you a complete account the teachings</p>
                                        </div>
                                        <a className="btn btn-primary mt-5" href="career-single.html">Apply Now</a>
                                    </TabPane>
                                    <TabPane tabId="tab1-2">
                                        {/* Content for tab 2 */}
                                    </TabPane>
                                    <TabPane tabId="tab1-3">
                                        {/* Content for tab 3 */}
                                    </TabPane>
                                    <TabPane tabId="tab1-4">
                                        {/* Content for tab 4 */}
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
        </>
    );
}

export default OpenPosition;
