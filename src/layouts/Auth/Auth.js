import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data);

      // Lakukan pengecekan login di sini
      if (response.status === 200) {
        // Login berhasil, lakukan sesuatu (misalnya, arahkan ke halaman beranda)
        // set token
        localStorage.setItem("token", response.data.data.token);
        navigate("/admin/dashboard");
        console.log("Login berhasil!");
      } else {
        // Login gagal, lakukan sesuatu (misalnya, tampilkan pesan kesalahan)
        console.log("Login gagal!");
      }
    } catch (error) {
      // Tangani error saat melakukan permintaan
      console.error("Error:", error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs="12" md="6">
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormGroup>
            <Button type="submit" color="primary" block>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
