import React, { useState } from 'react';
import promo from '../login/promo.jpg';
import '../login/login.css';
import brands from '../login/brands.jpg'
import { useNavigate } from 'react-router-dom';


const DashboardPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submiting, setSubmiting] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter valid email and password');
            return;
        }

        setSubmiting(true);

        setTimeout(() => {
            setSubmiting(false);
            if (email === 'user@gmail.com' && password === 'password') {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
                setError('Incorrect email or password');
            }
        }, 1500);
    };

    const navigate = useNavigate();
    return (
        <div className='wrapper'>
            <div className='content-wrapper'>
                <div className='main-container'>
                    <div className='login-header'>
                        <label className='login-header-text'>Dashboard</label>
                        <button onClick={() => { }} style={{ background: 'none', border: 'none', cursor: 'pointer', height: 20, width: 20 }}>
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="2" />
                                <line x1="20" y1="4" x2="4" y2="20" stroke="black" strokeWidth="2" />
                            </svg>
                        </button>
                    </div>
                    <img src={promo} alt="Banner" className='login-promo' />


                </div>
                <img src={brands} alt="Banner" className='login-promo' />
            </div>
        </div>);
}

export default DashboardPage;