import React from 'react';
import { useNavigate } from "react-router-dom";

function SuccessResetPass() {
    let navigate = useNavigate();

    return (
        <div>
        <div class="m-2 justify-center px-6  lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-44 w-auto rounded-xl" src="../OrganizeMe.png" alt="Your Company" />

                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Congratulation, your password has been changed successfully !</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <p onClick={() => navigate('/')} class="mt-10 text-center text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Back to sign in
                </p>
            </div>
        </div>

    </div>
    );
}

export default SuccessResetPass;