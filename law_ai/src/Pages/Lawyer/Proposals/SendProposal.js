import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
    Button,
    Col,
    Container,
    Image,
    Row,
} from "reactstrap";
import HerosectionHeader from '../../../Componet/Herosection/HerosectionHeader';
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
const toastConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

const SendProposal = () => {
    const { state } = useLocation();
    const [authState] = useCookies(["myAuthUser"]);
    const [proposalData, setProposalData] = useState({});
    const api_url = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [totalProposals, setTotalProposals] = useState(0);
    const [job, setJob] = useState();

    const submitProposal = async (e) => {
        e.preventDefault();
        proposalData.jobId = job?._id;
        const result = await fetch(`${api_url}/proposal/`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authState.myAuthUser.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proposalData)
        });
        const response = await result.json();
        if (result.status === 200) {
            toast.success(response.resultMessage.en, toastConfig);
            navigate("/proposals");
        } else {
            toast.error(response.resultMessage.en, toastConfig);
        }
    }

    useEffect(() => {
        if (!state) {
            navigate("/cases")
        } else {
            console.log(state);
            setJob(state);
            countProposals(state);
        }
    }, []);

    const countProposals = async (job) => {
        const result = await fetch(`${api_url}/proposal/count-job-proposal?jobId=${job._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await result.json();
        if (result.status === 200) {
            setTotalProposals(response.totalProposals)
        } else {
            toast.error(response.resultMessage.en, toastConfig);
        }
    }

    return (
        <>
            <HerosectionHeader folder1={"cases"} name={"Send Proposal"} />
            <div className="page-wrapper">
                {job &&
                    <div className="page-content" >
                        <Container className="container">
                            <div style={{ border: "1px solid lightgray", borderTop: "none", padding: "20px 30px" }}>
                                <Row className="align-items-center">
                                    <Col lg={12}>
                                        <div className="product-details">
                                            <div className="d-flex mt-2 justify-content-between">
                                                <h4>{job.title}</h4>
                                                {moment(job.createdAt).fromNow()}
                                            </div>
                                            {/* <div className="product-price my-4">
                                                <span className="d-block"> ${product.salePrice} <del>${product.price} </del></span>
                                                <span className="text-primary">
                                                    {Array.from({ length: product.rating }).map((_, index) => (
                                                        <i key={index} className="las la-star"></i>
                                                    ))}
                                                </span>
                                            </div> */}
                                            <ul className="list-unstyled my-4">
                                                <li className="mb-2 text-black">
                                                    Location: <span className="text-muted">{job.city}</span>
                                                </li>
                                            </ul>
                                            <div className="mt-3">
                                                <p><i className="las la-coins" style={{fontSize: "20px"}}></i> {" "}Est. Budget {`${job.estimatedBudget}`}</p>
                                            </div>
                                            <p className="mb-4">{job.summary}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2 text-black">
                                        Total Proposals: <span className="text-muted">{totalProposals}</span>
                                    </li>
                                    <li className="mb-2 text-black">
                                        job Posted: <span className="text-muted">{moment(job.createdAt).fromNow()}</span>
                                    </li>
                                </ul>
                                <form id="contact-form" onSubmit={submitProposal} className="row">
                                    {/* <div className="form-group col-md-3">
                                        <select className="form-control">
                                            <option>- Select Service</option>
                                            <option>Consulting</option>
                                            <option>Finance</option>
                                            <option>Marketing</option>
                                            <option>Avanced Analytics</option>
                                            <option>planning</option>
                                        </select>
                                    </div> */}
                                    <h6>Tell you client why you are best for his/her case.</h6>
                                    <div className="form-group col-md-12 py-2" style={{ border: "1px solid lightgray", borderRadius: "8px" }}>
                                        <textarea value={proposalData.summary} onChange={(e) => { setProposalData({ ...proposalData, summary: e.target.value }) }} className="form-control h-auto" placeholder="Write down your proposal here..." rows={5} required="required" />
                                        <div className="help-block with-errors" />
                                    </div>
                                    <div className="col mt-4">
                                        <button type='submit' className="btn btn-primary">Submit Proposal</button>
                                    </div>
                                </form>
                            </div>
                        </Container>
                    </div>
                }
            </div>
        </>
    )
}

export default SendProposal