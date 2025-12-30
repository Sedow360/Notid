import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./assets/Login/Login.tsx";
import Dashboard from "./assets/Dashboard/Dashboard.tsx";
import Register from "./assets/Register/Register.tsx";

function App() {

  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
    </BrowserRouter>
  )
}

export default App
