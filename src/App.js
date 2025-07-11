import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Books from './components/Books';
import Dashboard from './components/Dasboard';
import AllBooks from './components/AllBooks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/add" element={<AddBook />} />
      <Route path="/books/:isbn" element={<EditBook />} />
      <Route path="/allbooks" element={<AllBooks />} />
    </Routes>
  );
}

export default App;
