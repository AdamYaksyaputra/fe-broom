import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function Tables() {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [categoryList, setCategoryList] = useState([
    { id: 1, name: "Regular Class" },
    { id: 2, name: "Creative Class" },
    { id: 3, name: "Smart Class" },
  ]);
  const [categoryId, setCategoryId] = useState(null);

  const toggleModal = (categoryId) => {
    setCategoryId(categoryId);
    setModal(!modal);
    if (categoryId) {
      const category = categoryList.find((category) => category.id === categoryId);
      if (category) {
        setName(category.name);
      }
    } else {
      setName("");
    }
  };

  const handleSave = () => {
    if (categoryId) {
      const updatedCategoryList = categoryList.map((category) =>
        category.id === categoryId ? { ...category, name } : category
      );
      setCategoryList(updatedCategoryList);
    } else {
      const newCategory = { id: Date.now(), name };
      setCategoryList([...categoryList, newCategory]);
    }
    setModal(false);
    setName("");
    setCategoryId(null);
  };

  const handleDelete = (categoryId) => {
    const updatedCategoryList = categoryList.filter(
      (category) => category.id !== categoryId
    );
    setCategoryList(updatedCategoryList);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Category List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList.map((category) => (
                      <tr key={category.id}>
                        <td>{category.name}</td>
                        <td>
                          <Button
                            color="info"
                            size="sm"
                            onClick={() => toggleModal(category.id)}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(category.id)}
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
                <Button color="primary" onClick={() => toggleModal(null)}>
                  Add Category
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {categoryId ? "Edit Category" : "Add Category"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="categoryName">Name</Label>
              <Input
                type="text"
                id="categoryName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            {categoryId ? "Save Changes" : "Create Category"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}



export default Tables;
