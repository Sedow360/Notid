import "./Login.css";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',  // Important for cookies!
            body: JSON.stringify({email, password})
        });
    
        if(res.ok) {
            navigate('/dashboard');
        } else {
            const data = await res.json();
            setError(data.error);
        }
    };

    return (
    <>
        <div className="login-container">
            <h2>Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div className="inputs">
                <div className="email-wrapper"><input type="email" placeholder="Enter Email" value={email} 
                    onChange={(e) => {setEmail(e.target.value)}}/><i>📥</i></div>
                <div className="password-wrapper"><input type="password" placeholder="Enter Password" value={password} 
                    onChange={(e) => {setPassword(e.target.value)}}/><i>🔒</i></div>
            </div>
            <button className="login-btn" onClick={handleLogin}>Login</button>
            <div className="register">
                <label>Don't have an account?</label>
                <Link to="/register">Register</Link>
            </div>
        </div>
    </>
    )
}

export default Login