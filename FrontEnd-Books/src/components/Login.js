import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    const loginData = { username, password };

    axios.post('http://localhost:8085/api/auth/login', loginData)
      .then(response => {
        localStorage.setItem('token', response.data);
        alert('Login successful!');
        navigate('/books');
      })
      .catch(error => {
        alert('Login failed! Please check your credentials');
        console.error(error);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1470&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card
        className="p-4 shadow border-0 text-white"
        style={{
          maxWidth: '450px',
          width: '90%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Transparent dark card
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '20px',
        }}
      >
        <div className="text-center mb-3">
          <FaSignInAlt size={30} color="#ffffff" />
          <h3 className="mt-2 text-white">Login to Your Account</h3>
        </div>
        <Form onSubmit={loginUser}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid white' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid white' }}
            />
          </Form.Group>
          <Button variant="light" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/signup" className="text-warning">Register</a>
        </p>
      </Card>
    </div>
  );
};

export default Login;
