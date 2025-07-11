import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

const EditBook = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', author: '', publicationyear: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:8085/book/viewABook/${isbn}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setBook(res.data)).catch(err => console.error(err));
  }, [isbn]);

  const updateBook = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8085/book/updateBook/${isbn}`, book, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      alert("Book updated!");
      navigate('/books');
    }).catch(err => console.error(err));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1601582581994-2b2b07f8686b?auto=format&fit=crop&w=1470&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Card
        className="p-4 shadow"
        style={{
          maxWidth: '500px',
          width: '90%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          backdropFilter: 'blur(8px)'
        }}
      >
        <h3 className="text-center mb-4">Edit Book</h3>
        <Form onSubmit={updateBook}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control
              value={book.publicationyear}
              onChange={(e) => setBook({ ...book, publicationyear: e.target.value })}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100" variant="success">Update Book</Button>
        </Form>
      </Card>
    </div>
  );
};

export default EditBook;
