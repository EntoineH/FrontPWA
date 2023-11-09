import React from 'react';
import RegisterForm from '../component/registerForm'

function RegisterPage() {
  return (
    <div class='h-screen w-full flex justify-center items-center'>
      <div class='bg-white lg:w-2/3 w-4/5 shadow-2xl rounded-3xl shadow-slate-600'>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;