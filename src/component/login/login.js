import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import promo from './promo.jpg';
import brands from './brands.jpg';
import './login.css';

// Validation schema
const schema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const LoginCard = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        setError('');
        setSubmitting(true);
        setSubmitting(false);
        if (data.email === 'user@gmail.com' && data.password === 'password') {
            setAuthenticated(true);
            navigate('/dashboard');
        } else {
            setAuthenticated(false);
            setError('Incorrect email or password');
        }
    };

    return (
        <div className="wrapper">
            <div className="content-wrapper">
                <div className="main-container">
                    <div className="login-header">
                        <label className="login-header-text">Login</label>
                        <button
                            onClick={() => navigate(-1)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', height: 20, width: 20 }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="2" />
                                <line x1="20" y1="4" x2="4" y2="20" stroke="black" strokeWidth="2" />
                            </svg>
                        </button>
                    </div>

                    <img src={promo} alt="Banner" className="login-promo" />

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="login-content">
                            <div className="login-content-column">
                                <label htmlFor="email" className="login-label">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register('email')}
                                    disabled={submitting}
                                    placeholder="Enter email address"
                                    className={`login-input ${errors.email ? 'border-red-500' : ''}`}
                                />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                            </div>

                            <div className="login-content-column">
                                <label htmlFor="password" className="login-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register('password')}
                                    disabled={submitting}
                                    placeholder="Enter password"
                                    className={`login-input ${errors.password ? 'border-red-500' : ''}`}
                                />
                                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                style={{ marginTop: '40px', marginBottom: '20px' }}
                                className="button"
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            ></path>
                                        </svg>
                                        Logging in...
                                    </div>
                                ) : (
                                    'NEXT'
                                )}
                            </button>

                            <button
                                type="button"
                                className="text-button"
                                onClick={() => navigate('/create-account')}
                            >
                                Create an Account
                            </button>
                        </div>
                    </form>
                </div>

                <img src={brands} alt="Brands" className="login-promo" />
            </div>
        </div>
    );
};

export default LoginCard;
