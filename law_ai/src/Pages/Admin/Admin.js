import { Link, json } from "react-router-dom";
import { useState, useEffect } from "react";
import HerosectionHeader from "../../Componet/Herosection/HerosectionHeader";
import {
  Col,
  Container,
  Row,
  Button,
  Dropdown,
  ButtonDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
} from "reactstrap";
import { Spinner } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const api_url = process.env.REACT_APP_API_URL;

const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export default function Admin() {
  const [sendingEmailLoading, setSendingEmailLoading] = useState(false);
  const [authState] = useCookies(["myAuthUser"]);
  const [messagesAnalytics, setMessagesAnalytics] = useState({});
  const [casesAnalytics, setCasesAnalytics] = useState({});
  const [userRegistrationAnalytics, setUserRegistrationAnalytics] = useState({});
  const [caseDaysDropdownOpen, setCaseDaysDropdownOpen] = useState(false);
  const [caseSelectDays, setCaseSelectDays] = useState(7);
  const [messagesDaysDropdownOpen, setMessagesDaysDropdownOpen] = useState(false);
  const [messagesSelectDays, setMessagesSelectDays] = useState(7);
  const [userRegisterDaysDropdownOpen, setUserRegisterDaysDropdownOpen] = useState(false);
  const [userRegisterSelectDays, setUserRegisterSelectDays] = useState(7);
  const [userRegisterTypeDropdownOpen, setUserRegisterTypeDropdownOpen] = useState(false);
  const [userRegisterSelectType, setUserRegisterSelectType] = useState("All");


  const sendVerificationEmailToLawyers = async()=>{
    setSendingEmailLoading(true);
    const result = await fetch(
      `${api_url}/user/mail-lawyers-to-verify/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authState?.myAuthUser?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await result.json();
    setSendingEmailLoading(false);
    if(response.resultCode === "00700"){
      toast.success(response.resultMessage.en, toastConfig);
    }else{
      toast.error(response.resultMessage.en, toastConfig);
    }
  }

  const getTotalMessagesAnalytics = async()=>{
    const result = await fetch(
      `${api_url}/analytics/totalMessages/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.myAuthUser?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration: messagesSelectDays
        })
      }
    );
    const response = await result.json();
    if(response.resultCode === "00800"){
      setMessagesAnalytics(response?.data);
    }else{
      toast.error(response.resultMessage.en, toastConfig);
    }
  }

  const getNoOfCasesAnalytics = async(days)=>{
    const result = await fetch(
      `${api_url}/analytics/noOfCases/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.myAuthUser?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration: caseSelectDays
        })
      }
    );
    const response = await result.json();
    console.log(response);
    if(response.resultCode === "00802"){
      setCasesAnalytics(response?.data);
    }else{
      toast.error(response.resultMessage.en, toastConfig);
    }
  }

  const getRegistrationsAnalytics = async()=>{
    const result = await fetch(
      `${api_url}/analytics/registrations/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.myAuthUser?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration: userRegisterSelectDays,
          type: userRegisterSelectType
        })
      },
    );
    const response = await result.json();
    if(response.resultCode === "00804"){
      setUserRegistrationAnalytics(response?.data);
    }else{
      toast.error(response.resultMessage.en, toastConfig);
    }
  }

  function sumObjectValues(obj) {
    // Get an array of values from the object
    const valuesArray = Object.values(obj);
  
    // Use the reduce function to sum the values
    const sum = valuesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
    return sum;
  }
  

  useEffect(() => {
    getNoOfCasesAnalytics();
  }, [caseSelectDays]);

  useEffect(() => {
    getRegistrationsAnalytics();
  }, [userRegisterSelectDays, userRegisterSelectType]);

  useEffect(() => {
    getTotalMessagesAnalytics();
  }, [messagesSelectDays]);


  return (
    <div className="page-wrapper">
      <HerosectionHeader name={"Admin"} />
      <div className="page-content py-5">
        <Container>
          <Row>
            <Col md={12}>
              <h4>Menu</h4>
              <div className="d-flex flex-wrap" style={{ gap: 16 }}>
                <Link to="lawyer-verification">
                  <Button>
                    Verification Request
                  </Button>
                </Link>
              </div>
              <hr/>
              <div className="row gx-2">
                <div className="col-6 my-4 border p-3 round-2 rounded">
                  <div className="d-flex justify-content-between">
                    <h4>No. Of Cases ({sumObjectValues(casesAnalytics)})</h4>
                    <div>
                      <ButtonDropdown 
                        isOpen={caseDaysDropdownOpen} 
                        toggle={()=>setCaseDaysDropdownOpen(!caseDaysDropdownOpen)}
                      >
                        <DropdownToggle className="btn btn-sm" caret>
                          Last {caseSelectDays} Days
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Days</DropdownItem>
                          <DropdownItem onClick={()=>setCaseSelectDays(7)}>Last 7 Days</DropdownItem>
                          <DropdownItem onClick={()=>setCaseSelectDays(30)}>Last 30 Days</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Line
                      datasetIdKey='cases'
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },           
                        }
                      }}
                      data={{
                        labels: Object.keys(casesAnalytics),
                        datasets: [
                          {
                            id: 1,
                            label: "",
                            data: Object.values(casesAnalytics),
                            borderColor: '#ff9248',
                            backgroundColor: '#ff9248',
                          }
                        ],
                      }}
                    />
                  </div>
                </div>
                <div className="col-6 my-4 border p-3 round-2 rounded">
                  <div className="d-flex justify-content-between">
                    <h4>No. Of Message ({sumObjectValues(messagesAnalytics)})</h4>
                    <div>
                      <ButtonDropdown isOpen={messagesDaysDropdownOpen} toggle={()=>setMessagesDaysDropdownOpen(!messagesDaysDropdownOpen)}>
                        <DropdownToggle className="btn btn-sm" caret>
                          Last {messagesSelectDays} Days
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Days</DropdownItem>
                          <DropdownItem onClick={()=>setMessagesSelectDays(7)}>Last 7 Days</DropdownItem>
                          <DropdownItem onClick={()=>setMessagesSelectDays(30)}>Last 30 Days</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Line
                      datasetIdKey='messages'
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },           
                        }
                      }}
                      data={{
                        labels: Object.keys(messagesAnalytics),
                        datasets: [
                          {
                            id: 1,
                            label: '',
                            data: Object.values(messagesAnalytics),
                            borderColor: 'lightgreen',
                            backgroundColor: 'lightgreen',
                          }
                        ],
                      }}
                    />
                  </div>
                </div>
                <div className="col-6 my-4 border p-3 round-2 rounded">
                  <div className="d-flex justify-content-between">
                    <h4>No. Of Users Registers ({sumObjectValues(userRegistrationAnalytics)})</h4>
                    <div>
                        <ButtonDropdown 
                            isOpen={userRegisterTypeDropdownOpen} 
                            toggle={()=>setUserRegisterTypeDropdownOpen(!userRegisterTypeDropdownOpen)}
                            className="mx-2"
                        >
                            <DropdownToggle className="btn btn-sm" caret>
                              {userRegisterSelectType}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem header>Type</DropdownItem>
                              <DropdownItem onClick={()=>setUserRegisterSelectType("All")}>All</DropdownItem>
                              <DropdownItem onClick={()=>setUserRegisterSelectType("Lawyer")}>Lawyer</DropdownItem>
                              <DropdownItem onClick={()=>setUserRegisterSelectType("Client")}>Client</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        <ButtonDropdown 
                          isOpen={userRegisterDaysDropdownOpen} 
                          toggle={()=>setUserRegisterDaysDropdownOpen(!userRegisterDaysDropdownOpen)}
                        >
                          <DropdownToggle className="btn btn-sm" caret>
                            Last {userRegisterSelectDays} Days
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem header>Days</DropdownItem>
                            <DropdownItem onClick={()=>setUserRegisterSelectDays(7)}>Last 7 Days</DropdownItem>
                            <DropdownItem onClick={()=>setUserRegisterSelectDays(30)}>Last 30 Days</DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Line
                      datasetIdKey='users'
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },           
                        }
                      }}
                      data={{
                        labels: Object.keys(userRegistrationAnalytics),
                        datasets: [
                          {
                            id: 1,
                            label: '',
                            data: Object.values(userRegistrationAnalytics),
                            borderColor: 'lightblue',
                            backgroundColor: 'lightblue',
                          }
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
              <hr/>
              <p>Send email to non-verified lawyers to get verified</p>
              <div className="d-flex flex-wrap" style={{ gap: 16 }}>
                <Button onClick={sendVerificationEmailToLawyers} disabled={sendingEmailLoading}>
                  {sendingEmailLoading?
                  <Spinner size="sm" />
                  :
                  "Send Email"}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}