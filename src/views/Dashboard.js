import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from "reactstrap";

function Dashboard(props) {
  const roomData = [
    { name: "0205", category: 2, capacity: 40 },
    { name: "0403", category: 3, capacity: 40 },
  ];

  const toolData = [
    { name: "Saramonic", type: "Microphone" },
  ];

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4">{/* Total Room Card */}</Col>
          <Col lg="4">{/* Total Tools Card */}</Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
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
                    </tr>
                  </thead>
                  <tbody>
                    {roomData.map((room, index) => (
                      <tr key={index}>
                        <td>{room.name}</td>
                        <td>{room.category}</td>
                        <td>{room.capacity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
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
                    </tr>
                  </thead>
                  <tbody>
                    {toolData.map((tool, index) => (
                      <tr key={index}>
                        <td>{tool.name}</td>
                        <td>{tool.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
