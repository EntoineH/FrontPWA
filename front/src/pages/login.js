import React from 'react';
import LoginForm from '../component/loginForm'

function LoginPage() {
  return (
    <div class='h-screen w-full flex justify-center items-center'>
      <div class='bg-white lg:w-2/3 w-4/5 shadow-2xl rounded-3xl shadow-slate-600'>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;