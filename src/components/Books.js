import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Card, Row, Col } from 'react-bootstrap';

const Books = () => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8085/book/getAllBooks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const deleteBook = async (isbn) => {
    try {
      await axios.delete(`http://localhost:8085/book/removeBook/${isbn}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1470&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '30px',
      }}
    >
      <Card
        className="p-4 w-100 shadow"
        style={{
          maxWidth: '1100px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Row className="mb-3 align-items-center">
          <Col><h2 className="text-center">📘 Book Management</h2></Col>
          <Col className="text-end">
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="text-start">
            <Link to="/allbooks">
              <Button variant="info">View Books</Button>
            </Link>
          </Col>
          <Col className="text-end">
            <Link to="/books/add">
              <Button variant="success">Add New Book</Button>
            </Link>
          </Col>
        </Row>

        <Table bordered hover responsive className="text-center">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.isbn}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publicationyear}</td>
                <td>{book.isbn}</td>
                <td>
                  <Link to={`/books/${book.isbn}`}>
                    <Button size="sm" variant="outline-secondary" className="me-2">Edit</Button>
                  </Link>
                  <Button size="sm" variant="outline-danger" onClick={() => deleteBook(book.isbn)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Books;
