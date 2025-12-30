import "./Register.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setName] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    
    const handleRegister = async () => {
        const res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',  // Important for cookies!
            body: JSON.stringify({username, email, password})
        });
        
        if(res.ok) {
            navigate('/dashboard');
        } else {
            setError("Username already exists.");
        }
    };
    
    return (
        <>
            <div className="register-container">
                <h2>Register</h2>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <div className="inputs">
                    <div className="email-wrapper"><input type="email" placeholder="Enter Email" value={email} 
                        onChange={(e) => {setEmail(e.target.value)}}/><i>📥</i></div>
                    <div className="name-wrapper"><input type="type" placeholder="Enter Username" value={username} 
                        onChange={(e) => {setName(e.target.value)}}/><i>🐸</i></div>
                    <div className="password-wrapper"><input type="password" placeholder="Enter Password" value={password} 
                        onChange={(e) => {setPassword(e.target.value)}}/><i>🔒</i></div>
                </div>
                <button className="register-btn" onClick={handleRegister}>Register</button>
            </div>
        </>
    );
}

export default Register;