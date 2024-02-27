import { useState } from "react";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Modal from "react-bootstrap/Modal";
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
};

const defaultValue = {
  _id: "",
  name: "",
  phone: "",
  case_type: "",
};

export default function Clients({ verified, clients, handleChangeClient, handleDeleteClient }) {
  const [client, setClient] = useState(defaultValue);
  const [mode, setMode] = useState("add");

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setClient((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(client).indexOf("") >= 0) {
      return toast.error("Please fill all fields!", toastConfig);
    }

    setLoading(true);
    handleChangeClient(client);
    setClient(defaultValue);
    setLoading(false);
    setModal(false);
  };

  return (
    <>
      {/* Modal */}
      <Modal
        id="modal"
        show={modal}
        onHide={() => {
          setModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-capitalize">{mode} Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }}>Name</Label>
              <Input
                name="name"
                value={client.name}
                onChange={handleChange}
                disabled={loading || verified}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }}>Phone</Label>
              <Input
                name="phone"
                value={client.phone}
                onChange={handleChange}
                disabled={loading || verified}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }}>Case Type</Label>
              <Input
                name="case_type"
                value={client.case_type}
                onChange={handleChange}
                disabled={loading || verified}
                required
              />
            </FormGroup>
            <Button type="submit" onClick={handleSubmit} variant="primary" disabled={loading || verified}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="d-flex mb-2 align-items-center" style={{ gap: 16 }}>
        <span style={{ fontWeight: "bold" }}>Clients</span>
        <Button
          size="sm"
          type="button"
          onClick={() => {
            setMode("add");
            setClient((prev) => ({ ...prev, _id: clients?.length + 1 }));
            setModal(true);
          }}
        >
          Add
        </Button>
      </div>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Case Type</th>
          </tr>
        </thead>
        <tbody>
          {clients?.length > 0 ? (
            clients.map((client, index) => (
              <tr
                key={index}
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => handleDeleteClient(client._id)}
              >
                <th scope="row">{index + 1}</th>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.case_type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <th colSpan={4} className="text-center">
                Empty.
              </th>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
