import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function RegisterForm() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const handleUsername = event => {
        setUsername(event.target.value);
    };

    const handleEmail = event => {
        setEmail(event.target.value);
    };

    const handlePassword = event => {
        setPassword(event.target.value);
    };

    const handleConfirmPassword = event => {
        setconfirmPassword(event.target.value);
    };
    
    const handleRegister = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/users', { "username": username, "email": email, "password": password})
        .then(res => {
          if (res.data["success"] === true) {
            navigate('/dashboard')
          } else {
    
          }
        })
    }

    return (
        <div>
            <div class="m-2 justify-center px-6  lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img class="mx-auto h-44 w-auto rounded-xl" src="../OrganizeMe.png" alt="Your Company" />

                    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
                </div>

                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleRegister} class="space-y-6">

                        <div>
                            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <div class="mt-2">
                                <input
                                    onChange={handleUsername}
                                    value={username}
                                    id="username" name="username" type="username" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div class="mt-2">
                                <input
                                    onChange={handleEmail}
                                    value={email}
                                    id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>

                            </div>
                            <div class="mt-2">
                                <input
                                    onChange={handlePassword}
                                    value={password}
                                    id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            </div>

                            <div class="mt-2">
                                <input
                                    onChange={handleConfirmPassword}
                                    value={confirmPassword}
                                    id="confirmPassword" name="confirmPassword" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                        </div>
                    </form>

                    <p class="mt-10 text-center text-sm text-gray-500">
                        Already member ?
                        <a onClick={() => navigate('/')} class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign in</a>
                    </p>
                </div>
            </div>

        </div>
    );
}

export default RegisterForm;
