import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Card, Row, Col } from 'react-bootstrap';

const AllBooks = () => {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        padding: '30px',
        backgroundImage: 'url("https://images.unsplash.com/photo-1512820790803-83ca734da794")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Card className="p-4 w-100 shadow-lg" style={{ maxWidth: '1100px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '20px' }}>
        <Row className="mb-3">
          <Col><h2 className="text-center">Available Books</h2></Col>
          <Col className="text-end">
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>

        <Table bordered hover responsive className="mt-3">
          <thead className="table-dark text-center">
            <tr><th>Title</th><th>Author</th><th>Year</th><th>ISBN</th></tr>
          </thead>
          <tbody className="text-center">
            {books.length > 0 ? books.map((book) => (
              <tr key={book.isbn}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publicationyear}</td>
                <td>{book.isbn}</td>
              </tr>
            )) : (
              <tr><td colSpan="4" className="text-muted">No books available.</td></tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default AllBooks;
