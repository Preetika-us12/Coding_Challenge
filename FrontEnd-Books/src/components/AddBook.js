import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

const AddBook = () => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationyear, setPublicationyear] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const addBook = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8085/book/addBook', { isbn, title, author, publicationyear }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(() => {
      alert("Book added!");
      navigate('/books');
    }).catch((err) => console.error(err));
  };

  return (
    <Card className="p-4 m-5 mx-auto shadow" style={{ maxWidth: '500px' }}>
      <h3 className="text-center mb-4">Add New Book</h3>
      <Form onSubmit={addBook}>
        <Form.Group className="mb-3"><Form.Label>ISBN</Form.Label><Form.Control value={isbn} onChange={(e) => setIsbn(e.target.value)} required /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>Title</Form.Label><Form.Control value={title} onChange={(e) => setTitle(e.target.value)} required /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>Author</Form.Label><Form.Control value={author} onChange={(e) => setAuthor(e.target.value)} required /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>Year</Form.Label><Form.Control value={publicationyear} onChange={(e) => setPublicationyear(e.target.value)} required /></Form.Group>
        <Button type="submit" className="w-100">Add Book</Button>
      </Form>
    </Card>
  );
};

export default AddBook;
