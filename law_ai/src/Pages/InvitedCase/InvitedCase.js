import React, { useEffect, useState } from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";
import CaseDetails from '../Cases/CaseDetails';
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import LargeSpinner from '../../Componet/Spinners/LargeSpinner';

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

const InvitedCase = ({ showCanvas, setShowCanvas, caseId, setCaseId, User}) => {
    const [authState] = useCookies(["myAuthUser"]);
    const [activeCase, setActiveCase] = useState({});
    const [loading, setLoading] = useState(true);
    const api_url = process.env.REACT_APP_API_URL;
    
    useEffect(() => {
        if(showCanvas){
            async function fetchData(){
                const result = await fetch(`${api_url}/job/get-private-job`, {
                    method: "POST",
                    headers: {
                    Authorization: `Bearer ${authState?.myAuthUser?.token}`,
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        job: caseId,
                    }),
                });
                const response = await result.json();
                if(response.resultCode === "00201") {
                    setActiveCase(response.jobDetails);
                    setLoading(false);
                }else{
                    setShowCanvas(false);
                    toast.error(response.resultMessage.en, toastConfig);
                }
            }
            fetchData();
        }

    }, [caseId, showCanvas]);

    return (
        <>
            <Offcanvas
                show={showCanvas}
                placement="end"
                onHide={() => {
                    setShowCanvas(false);
                }}
            >
                <Offcanvas.Body>
                    {
                        loading?
                         <LargeSpinner />
                        :
                        <CaseDetails job={activeCase} User={User} />
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default InvitedCase;