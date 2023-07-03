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
  const [toolId, setToolId] = useState("");
  const [toolName, setToolName] = useState("");
  const [type, setType] = useState("");
  const [toolList, setToolList] = useState([
    { id: 1, name: "Saramonic", type: "Microphone" },

  ]);

  const toggleModal = (action, toolId = "") => {
    setAction(action);
    setToolId(toolId);
    setToolName("");
    setType("");
    setModal(!modal);
  };

  const handleAction = () => {
    if (action === "create") {
      const newTool = {
        id: toolList.length + 1,
        name: toolName,
        type,
      };
      setToolList([...toolList, newTool]);
    } else if (action === "delete") {
      const updatedToolList = toolList.filter((tool) => tool.id !== toolId);
      setToolList(updatedToolList);
    } else if (action === "update") {
      const updatedToolList = toolList.map((tool) =>
        tool.id === toolId ? { ...tool, name: toolName, type } : tool
      );
      setToolList(updatedToolList);
    }

    toggleModal("");
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Tool List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toolList.map((tool) => (
                      <tr key={tool.id}>
                        <td>{tool.name}</td>
                        <td>{tool.type}</td>
                        <td>
                        <Button
                            color="info"
                            size="sm"
                            onClick={() => toggleModal("update", tool.id)}
                          >
                            Update
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => toggleModal("delete", tool.id)}
                          >
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
          {action === "create" && "Create Tool"}
          {action === "delete" && "Delete Tool"}
          {action === "update" && "Update Tool"}
        </ModalHeader>
        <ModalBody>
          {action === "delete" && (
            <p>Are you sure you want to delete this tool?</p>
          )}
          {(action === "create" || action === "update") && (
            <Form>
              <FormGroup>
                <Label for="toolName">Tool Name</Label>
                <Input
                  type="text"
                  name="toolName"
                  id="toolName"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  type="text"
                  name="type"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
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
