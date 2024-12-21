import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import BookAppointment from './pages/BookAppointment';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
          </Routes>
        </main>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;