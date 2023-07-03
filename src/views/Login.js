import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            "http://127.0.0.1:8000/api/login",
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
      if (response.data.success) {
        // Login berhasil, lakukan sesuatu (misalnya, arahkan ke halaman beranda)
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
