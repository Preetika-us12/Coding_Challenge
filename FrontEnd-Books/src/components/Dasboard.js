import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const Dashboard = () => {
  const navigate = useNavigate();

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
  className="text-center p-5 shadow-lg"
  style={{
    maxWidth: '500px',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: '20px',
    backdropFilter: 'blur(10px)', 
    WebkitBackdropFilter: 'blur(10px)', 
    border: '1px solid rgba(255, 255, 255, 0.3)', 
    color: '#fff',
  }}
>
  <h2 className="mb-4 fw-bold">
    Welcome to Book Manager
  </h2>
  <p className="mb-4">Login or Sign Up to manage your book collection.</p>
  <div className="d-flex justify-content-around">
    <Button variant="light" size="lg" onClick={() => navigate('/login')}>
      Login
    </Button>
    <Button variant="outline-light" size="lg" onClick={() => navigate('/signup')}>
      Sign Up
    </Button>
  </div>
</Card>
    </div>
  );
};

export default Dashboard;
