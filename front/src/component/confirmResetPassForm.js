import React from 'react';
import { useNavigate } from "react-router-dom";

function ConfirmResetPassForm() {
    let navigate = useNavigate();

    return (
        <div>
        <div class="m-2 justify-center px-6  lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-44 w-auto rounded-xl" src="../OrganizeMe.png" alt="Your Company" />

                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Validation code</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" action="#" method="POST">
                    <div>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button onClick={() => navigate('/successresetpassword')} type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Confirm</button>
                    </div>
                </form>

                <p onClick={() => navigate('/resetpassword')} class="mt-10 text-center text-sm text-gray-500">
                    Back
                </p>
            </div>
        </div>

    </div>
    );
}

export default ConfirmResetPassForm;