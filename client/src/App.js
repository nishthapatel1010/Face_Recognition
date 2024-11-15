// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { UserContextProvider } from './context/UserContext';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Attendance from './pages/Attandance';
import Signup from './pages/Signup'
import Picture from './pages/Picture'
import SignIn from './pages/Signin';
import Profile from './components/Profile';
// import Navbar from './components/Navbar';

const App = () => {
    return (
        // <UserContextProvider> {/* Ensure your context provider wraps the routes */}
            <Router>
            {/* <Navbar/> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/user" element={<UserDashboard />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/upload" element={<Picture />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        // {/* </UserContextProvider> */}
    );
};

export default App;
