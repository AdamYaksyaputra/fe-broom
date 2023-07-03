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

function Tables() {
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [category, setCategory] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomList, setRoomList] = useState([
    { id: 1, name: "0205", category: "2", capacity: "40" },
    { id: 2, name: "0403", category: "3", capacity: "40" },
  ]);

  const toggleModal = (action, roomId = "") => {
    setAction(action);
    setRoomId(roomId);
    setModal(!modal);
  };

  const handleAction = () => {
    if (action === "create") {
      // Create logic
      const newRoom = {
        id: roomList.length + 1,
        name: roomName,
        category,
        capacity,
      };
      setRoomList([...roomList, newRoom]);
    } else if (action === "delete") {
      // Delete logic
      const updatedRoomList = roomList.filter((room) => room.id !== roomId);
      setRoomList(updatedRoomList);
    } else if (action === "update") {
      // Update logic
      const updatedRoomList = roomList.map((room) =>
        room.id === roomId ? { ...room, name: roomName, category, capacity } : room
      );
      setRoomList(updatedRoomList);
    }

    // Clear input fields
    setRoomName("");
    setCategory("");
    setCapacity("");

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
                <CardTitle tag="h4">Room List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Capacity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomList.map((room) => (
                      <tr key={room.id}>
                        <td>{room.name}</td>
                        <td>{room.category}</td>
                        <td>{room.capacity}</td>
                        <td>
                          <Button
                            color="info"
                            size="sm"
                            onClick={() => toggleModal("update", room.id)}>
                            Update
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => toggleModal("delete", room.id)}>
                            Delete
                          </Button>{" "}

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
          {action === "create" && "Create Room"}
          {action === "delete" && "Delete Room"}
          {action === "update" && "Update Room"}
        </ModalHeader>
        <ModalBody>
          {action === "delete" && (
            <p>Are you sure you want to delete this room?</p>
          )}
          {(action === "create" || action === "update") && (
            <Form>
              <FormGroup>
                <Label for="roomName">Room Name</Label>
                <Input
                  type="text"
                  name="roomName"
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="capacity">Capacity</Label>
                <Input
                  type="text"
                  name="capacity"
                  id="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
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

export default Tables;
