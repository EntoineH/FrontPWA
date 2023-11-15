import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterForm() {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleRegister = (event) => {
        event.preventDefault();
        axios
            .post('https://pwa-backend-2c14dae9b4e4.herokuapp.com/register', {
                username,
                email,
                password,
                confirmPassword,
            })
            .then((response) => {
                console.log("reponse == ", response)
                if (response.data.success === true) {
                    localStorage.setItem('id', response.data.user._id);
                    localStorage.setItem('email', response.data.user.email);
                    localStorage.setItem('username', response.data.user.username);
                    localStorage.setItem('projects', response.data.user.projects);
                    navigate('/dashboard');
                } else {
                    const { message } = response.data;
                    setErrors({})
                    if (message === 'Username already exists') {
                        setErrors((prevErrors) => ({ ...prevErrors, username: 'Username already exists' }));
                    } else if (message === 'Email already exists') {
                        setErrors((prevErrors) => ({ ...prevErrors, email: 'Email already exists' }));
                    } else if (message === 'Password and confirmPassword do not match') {
                        setErrors((prevErrors) => ({ ...prevErrors, password: 'Password and Confirm Password do not match' }));
                    } else {
                        setErrors((prevErrors) => ({ ...prevErrors, general: message || 'Unexpected error occurred' }));
                    }
                }
            })
    };

    return (
        <div>
            <div className="m-2 justify-center px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-44 w-auto rounded-xl"
                        src="../OrganizeMe.png"
                        alt="Your Company"
                    />

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleUsername}
                                    value={username}
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    required
                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.username ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.username && <p className="text-red-600">{errors.username}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleEmail}
                                    value={email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.email ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.email && <p className="text-red-600">{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handlePassword}
                                    value={password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.password && <p className="text-red-600">{errors.password}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleConfirmPassword}
                                    value={confirmPassword}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.confirmPassword ? 'border-red-500' : ''
                                        }`}
                                />
                                {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <a onClick={() => navigate('/')} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
