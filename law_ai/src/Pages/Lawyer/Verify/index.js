import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  NavItem,
  NavLink,
} from "reactstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";

import Clients from "./Clients";

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

const api_url = process.env.REACT_APP_API_URL;

const SubmitModal = ({ show, handleSubmit, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-capitalize">Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        There is a one time Registration fee of Rs. 880 for Payment gateway.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Yes</Button>
        <Button onClick={handleClose} color="danger">No</Button>
      </Modal.Footer>
    </Modal>
  )
}

const VerifyModal = ({ show, action, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-capitalize">Unverified Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your profile is not verified yet. Verify your profile using the button below.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={action} className="w-100">Get Verified</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default function Verify({ userId, verification, refresh }) {
  const [authState] = useCookies(["myAuthUser"]);
  const [showVerifyCanvas, setShowVerifyCanvas] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);

  const [form, setForm] = useState({
    CNIC_front_image_url: "",
    CNIC_back_image_url: "",
    BAR_front_image_url: "",
    BAR_back_image_url: "",
    BAR_no: "",
    location: "",
    main_court_of_practice: "",
    clients: [],
  });

  const [images, setImages] = useState({
    CNIC_front: null,
    CNIC_back: null,
    BAR_front: null,
    BAR_back: null,
  });

  const [tempImages, setTempImages] = useState({
    CNIC_front: null,
    CNIC_back: null,
    BAR_front: null,
    BAR_back: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleChangeClient = (client) => {
    const existingClient = form.clients.find((c) => c._id === client._id);
    if (existingClient) {
      const updatedClient = form.clients.map((c) => {
        return c.id === client.id
          ? {
              ...c,
              name: client.name,
              phone: client.phone,
              case_type: client.case_type,
            }
          : c;
      });
      setForm((prev) => {
        return {
          ...prev,
          clients: updatedClient,
        };
      });
    } else {
      const updatedClient = [...form.clients, { ...client }];
      setForm((prev) => {
        return {
          ...prev,
          clients: updatedClient,
        };
      });
    }
  };
  const handleDeleteClient = (id) => {
    const updatedClient = form.clients.filter((c) => c._id !== id);
    setForm((prev) => {
      return {
        ...prev,
        clients: updatedClient,
      };
    });
  };
  const handleChangeImage = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setImages((prev) => {
      return {
        ...prev,
        [name]: file,
      };
    });

    setTempImages((prev) => {
      if (prev[name]) {
        URL.revokeObjectURL(prev[name]);
      }

      return {
        ...prev,
        [name]: URL.createObjectURL(file),
      };
    });
  };

  const showSubmitModal = (e) => {
    e.preventDefault();
    setSubmitModal(true);
  }
  const handleSubmit = async () => {
    setLoading(true);
    console.log(images);
    try {
      await Promise.all(
        Object.entries(images).map(async ([key, value]) => {
          if(value != null){
            await uploadImage(value, `${key}_image_url`);
          }
        })
      );

      if (errorUpload) {
        throw new Error("Error when uploading images");
      }

      setForm(async prev => {
        
        try {
          // console.log('submit', Object.values(prev));
          if (Object.values(prev).indexOf("") >= 0) {
            throw new Error("Please fill all the fields!");
          }

          const result = await fetch(`${api_url}/user/verification`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authState?.myAuthUser?.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(prev),
          });

          const response = await result.json();
          if(result.status === 200){
            toast.success(response.resultMessage.en, toastConfig);
            refresh();
            setShowVerifyCanvas(false);
          }else{
            toast.error(response.resultMessage.en, toastConfig)
          }
        } catch (error) {
          toast.error(error.message, toastConfig);
        }
        return {
          ...prev
        }
      });
    } catch (error) {
      toast.error(error.message, toastConfig);
    }
    setSubmitModal(false);
    setLoading(false);
  };

  async function uploadImage(image, name) {
    const formData = new FormData();
    formData.append("file", image);

    const result = await fetch(`${api_url}/image/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
      },
      body: formData,
    });

    const response = await result.json();
    if (result.status === 200) {
      setForm((prev) => {
        const updatedForm = {
          ...prev,
          [name]: response?.result?.image_url,
        };
        return updatedForm;
      });
    } else {
      toast.error(response.resultMessage.en, toastConfig);
      setErrorUpload(true);
    }
  }

  useEffect(() => {
    if (verification?._id) {
      setForm(verification);
    }

    if (userId && !verification?._id) {
      setVerifyModal(true);
    }
  }, [verification?._id, userId]);

  return (
    <>
      <NavItem className="mb-md-0 mb-2">
        <NavLink
          className="nav-item nav-link"
          onClick={() => {
            setShowVerifyCanvas(true);
          }}
        >
          {verification?.status === "approved" ? "Verification Data" : "Get Verified"}
        </NavLink>
      </NavItem>
      <Offcanvas
        show={showVerifyCanvas}
        placement="end"
        onHide={() => {
          setShowVerifyCanvas(false);
        }}
      >
        <Offcanvas.Body>
          <Container className="px-0 px-md-5">
            <h3
              className="custom-h3 text-center mb-2"
              style={{ color: "#aa0505" }}
            >
              {verification?.status === "approved" ? "Verification Data" : "Get Verified"}
            </h3>
            <hr />
            <Form onSubmit={showSubmitModal}>
              <div
                className="d-flex flex-wrap"
                style={{
                  gap: 16,
                }}
              >
                <FormGroup className="flex-grow-1">
                  <Label style={{ fontWeight: "bold" }}>
                    CNIC of Lawyer front image
                  </Label>
                  <Input
                    name="CNIC_front"
                    type="file"
                    accept="image/*"
                    onChange={handleChangeImage}
                    disabled={loading}
                    required
                  />
                  {(tempImages?.CNIC_front || form.CNIC_front_image_url) && (
                    <img
                      src={tempImages.CNIC_front || form.CNIC_front_image_url}
                      alt="CNIC_front"
                      className="img-fluid"
                      style={{
                        maxWidth: "350px",
                      }}
                    />
                  )}
                </FormGroup>
                <FormGroup className="flex-grow-1">
                  <Label style={{ fontWeight: "bold" }}>
                    CNIC of Lawyer back image
                  </Label>
                  <Input
                    name="CNIC_back"
                    type="file"
                    accept="image/*"
                    onChange={handleChangeImage}
                    disabled={loading}
                  />
                  {(tempImages?.CNIC_back || form.CNIC_back_image_url) && (
                    <img
                      src={tempImages.CNIC_back || form.CNIC_back_image_url}
                      alt="CNIC_back"
                      className="img-fluid"
                      style={{
                        maxWidth: "350px",
                      }}
                    />
                  )}
                </FormGroup>
              </div>
              <div
                className="d-flex flex-wrap"
                style={{
                  gap: 16,
                }}
              >
                <FormGroup className="flex-grow-1">
                  <Label style={{ fontWeight: "bold" }}>
                    BAR Council Card front image
                  </Label>
                  <Input
                    name="BAR_front"
                    type="file"
                    accept="image/*"
                    onChange={handleChangeImage}
                    disabled={loading}
                  />
                  {(tempImages?.BAR_front || form.BAR_front_image_url) && (
                    <img
                      src={tempImages.BAR_front || form.BAR_front_image_url}
                      alt="BAR_front"
                      className="img-fluid"
                      style={{
                        maxWidth: "350px",
                      }}
                    />
                  )}
                </FormGroup>
                <FormGroup className="flex-grow-1">
                  <Label style={{ fontWeight: "bold" }}>
                    BAR Council Card back image
                  </Label>
                  <Input
                    name="BAR_back"
                    type="file"
                    accept="image/*"
                    onChange={handleChangeImage}
                    disabled={loading}
                  />
                  {(tempImages?.BAR_back || form.BAR_back_image_url) && (
                    <img
                      src={tempImages.BAR_back || form.BAR_back_image_url}
                      alt="BAR_back"
                      className="img-fluid"
                      style={{
                        maxWidth: "350px",
                      }}
                    />
                  )}
                </FormGroup>
              </div>
              <FormGroup>
                <Label style={{ fontWeight: "bold" }}>BAR No</Label>
                <Input
                  name="BAR_no"
                  value={form.BAR_no}
                  onChange={handleChange}
                  disabled={loading}
                  readOnly={verification?.status === "approved"}
                  required
                />
              </FormGroup>
              <div
                className="d-flex flex-wrap"
                style={{
                  gap: 16,
                }}
              >
                <FormGroup className="flex-grow-1">
                  <Label style={{ fontWeight: "bold" }}>Location</Label>
                  <Input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    disabled={loading}
                    readOnly={verification?.status === "approved"}
                    required
                  />
                </FormGroup>
                <FormGroup className="flex-grow-1">
                  <Label style={{ fontWeight: "bold" }}>
                    Main Court of Practice
                  </Label>
                  <Input
                    name="main_court_of_practice"
                    value={form.main_court_of_practice}
                    onChange={handleChange}
                    disabled={loading}
                    readOnly={verification?.status === "approved"}
                    required
                  />
                </FormGroup>
              </div>
              <Clients
                verified={verification?.status === "approved"}
                clients={form.clients}
                handleChangeClient={handleChangeClient}
                handleDeleteClient={handleDeleteClient}
              />
              <Button type="submit" variant="primary" disabled={loading || verification?.status === "approved"}>
                Submit
              </Button>
            </Form>
            <div className="my-2">
              {verification?.status === "pending" && (
                <span style={{
                  fontSize: "0.8rem",
                  color: "gray"
                }}>
                  *Your verification request is currently being processed and is under review.
                </span>
              )}
              {verification?.status === "approved" && (
                <span style={{
                  fontSize: "0.8rem",
                  color: "gray"
                }}>
                  *Your verification request is approved.
                </span>
              )}
              {verification?.status === "refuted" && (
                <>
                  <span style={{
                    fontSize: "0.8rem",
                    color: "gray"
                  }}>
                    *Your verification request has been refuted, you have the option to resubmit it for further review.
                  </span>
                  <p className="my-2">
                    Details: {verification?.description}
                  </p>
                </>
              )}
            </div>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>

      <SubmitModal
        show={submitModal}
        handleSubmit={handleSubmit}
        handleClose={() => setSubmitModal(false)}
      />

      <VerifyModal
        show={verifyModal}
        action={() => {
          setVerifyModal(false);
          setShowVerifyCanvas(true);
        }}
        handleClose={() => setVerifyModal(false)}
      />
    </>
  );
}
