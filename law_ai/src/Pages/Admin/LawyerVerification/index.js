import React, { useState } from "react";
import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import HerosectionHeader from "../../../Componet/Herosection/HerosectionHeader";

import Request from "./Request";

function LawyerVerification() {

  const [trigger, setTrigger] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  const handleChangeTab = (tabName) => {
    if (activeTab !== tabName) setActiveTab(tabName);
  };

  return (
    <div className="page-wrapper">
      <HerosectionHeader name={"Verification Request"} />
      <div className="page-content py-5">
        <Container>
          <Row>
            <Col md={12}>
              <Nav
                tabs
                className="nav nav-tabs mb-4"
                style={{ cursor: "pointer", borderBottom: "none" }}
              >
                {["pending", "approved", "rejected"].map((item) => (
                  <NavItem key={item} className="mb-md-0 mb-2">
                    <NavLink
                      className={
                        activeTab === item
                          ? " active ms-0 nav-item nav-link"
                          : " ms-0 nav-item nav-link"
                      }
                      onClick={() => {
                        setTrigger(Date.now());
                        handleChangeTab(item);
                      }}
                    >
                      <span className="text-capitalize">{item}</span>
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>

              <TabContent
                activeTab={activeTab}
                className="px-2 px-md-4 pt-3"
                style={{ border: "1px solid lightgray", borderRadius: "6px" }}
              >
                {["pending", "approved", "rejected"].map(item => (
                  <TabPane
                    key={`tab-${item}`}
                    tabId={item}
                    className="tab-pane fade show"
                  >
                    <Request status={item} effect={trigger} />
                  </TabPane>
                ))}
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LawyerVerification;
