import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function ReservationList() {
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [description, setDescription] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [reservationList, setReservationList] = useState([
    {
      id: 1,
      description: "Rapat HIMTI",
      reservationDate: "2023-06-09",
      checkIn: "09:00",
      checkOut: "11:00",
    },
    // Add more reservation objects here
  ]);

  const toggleModal = (action, reservationId = "") => {
    setAction(action);
    setReservationId(reservationId);
    setModal(!modal);
  };

  const handleAction = () => {
    if (action === "create") {
      // Create logic
      const newReservation = {
        id: reservationList.length + 1,
        description,
        reservationDate,
        checkIn,
        checkOut,
      };
      setReservationList([...reservationList, newReservation]);
    } else if (action === "delete") {
      // Delete logic
      const updatedReservationList = reservationList.filter(
        (reservation) => reservation.id !== reservationId
      );
      setReservationList(updatedReservationList);
    } else if (action === "update") {
      // Update logic
      const updatedReservationList = reservationList.map((reservation) =>
        reservation.id === reservationId
          ? {
              ...reservation,
              description,
              reservationDate,
              checkIn,
              checkOut,
            }
          : reservation
      );
      setReservationList(updatedReservationList);
    }

    // Clear input fields
    setDescription("");
    setReservationDate("");
    setCheckIn("");
    setCheckOut("");

    // Close the modal
    toggleModal("");
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Reservation List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Description</th>
                      <th>Reservation Date</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservationList.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>{reservation.description}</td>
                        <td>{reservation.reservationDate}</td>
                        <td>{reservation.checkIn}</td>
                        <td>{reservation.checkOut}</td>
                        <td>
                          <Button
                            color="info"
                            size="sm"
                            onClick={() =>
                              toggleModal("update", reservation.id)
                            }
                          >
                            Update
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() =>
                              toggleModal("delete", reservation.id)
                            }
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              <div className="card-footer">
                <Button color="primary" onClick={() => toggleModal("create")}>
                  Create
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal isOpen={modal} toggle={() => toggleModal("")}>
        <ModalHeader toggle={() => toggleModal("")}>
          {action === "create" && "Create Reservation"}
          {action === "delete" && "Delete Reservation"}
          {action === "update" && "Update Reservation"}
        </ModalHeader>
        <ModalBody>
          {action === "delete" && (
            <p>Are you sure you want to delete this reservation?</p>
          )}
          {(action === "create" || action === "update") && (
            <Form>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="reservationDate">Reservation Date</Label>
                <Input
                  type="date"
                  name="reservationDate"
                  id="reservationDate"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="checkIn">Check-in</Label>
                <Input
                  type="time"
                  name="checkIn"
                  id="checkIn"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="checkOut">Check-out</Label>
                <Input
                  type="time"
                  name="checkOut"
                  id="checkOut"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAction}>
            {action === "create" && "Create"}
            {action === "delete" && "Delete"}
            {action === "update" && "Update"}
          </Button>{" "}
          <Button color="secondary" onClick={() => toggleModal("")}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ReservationList;
