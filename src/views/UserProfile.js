import React, { useState, useEffect } from "react";
import axios from 'axios';
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


function UserProfile() {
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(response => {
        // console.log(response.data);
        setUserList(response.data.data);
        // console.log("USSER LIST ", response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Memperbarui token di local storage
  const updateToken = (token) => {
    localStorage.setItem('token', token);
  };

  // Mendapatkan token dari local storage
  const getToken = () => {
    return localStorage.getItem('token'); 
  };

  const toggleModal = (actionType, userId) => {
    setAction(actionType);
    setModal(!modal);

    if (actionType === "create") {
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
    } else if (actionType === "update") {
      const user = userList.find((user) => user.id === userId);
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setRole(user.role);
      }
    }

    setUserId(userId);
  };

  const createUser = () => {
    console.log(name, email, password, role);
    if (!role) {
      console.error("Role is required.");
      return;
    }

    const newUser = { name, email, password, role };
    axios.post('http://localhost:8000/api/user', newUser)
      .then(response => {
        setUserList([...userList, response.data.data]);
        toggleModal();
      })
      .catch(error => {
        console.error(error.response.data);
      });
  };

  const updateUser = () => {
    console.log(name, email, password, role);
    if (!role) {
      console.error("Role is required.");
      return;
    }

    const updatedUser = { id: userId, name, email, password, role };
    axios.put(`http://localhost:8000/api/user/${userId}`, updatedUser)
      .then(response => {
        const updatedUserList = userList.map(user => {
          if (user.id === userId) {
            return response.data;
          }
          return user;
        });
        setUserList(updatedUserList);
        toggleModal();
      })
      .catch(error => {
        console.error(error);
      });
  };


  const deleteUser = () => {
    axios.delete(`http://localhost:8000/api/user/${userId}`)
      .then(() => {
        const updatedUserList = userList.filter(user => user.id !== userId);
        setUserList(updatedUserList);
        toggleModal();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">User List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList?.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                        <td>
                          <Button
                            color="info"
                            size="sm"
                            onClick={() => toggleModal("update", user.id)}
                          >
                            Update
                          </Button>{" "}
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => toggleModal("delete", user.id)}
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

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {action === "create" && "Create User"}
          {action === "delete" && "Delete User"}
          {action === "update" && "Update User"}
        </ModalHeader>
        <ModalBody>
          {action === "delete" ? (
            <p>Are you sure you want to delete this user?</p>
          ) : (
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="role">Role</Label>
                <Input
                  type="select"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </Input>
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          {action === "create" && (
            <Button color="primary" onClick={createUser}>
              Create
            </Button>
          )}
          {action === "update" && (
            <Button color="primary" onClick={updateUser}>
              Update
            </Button>
          )}
          {action === "delete" && (
            <Button color="danger" onClick={deleteUser}>
              Delete
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UserProfile;
