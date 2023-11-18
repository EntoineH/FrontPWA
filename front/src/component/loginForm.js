import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Verify the token on the server
      const verifyToken = async () => {
        try {
          const response = await axios.post(
            "https://pwa-backend-2c14dae9b4e4.herokuapp.com/validate-token",
            { token }
          );
          if (response.data.success === true) {
            // If the token is valid, navigate to the dashboard
            navigate("/dashboard");
          } else {
            // If the token is invalid or expired, clear it from local storage
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          // Handle error as needed
        }
      };

      verifyToken();
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://pwa-backend-2c14dae9b4e4.herokuapp.com/login",
        {
          email,
          password,
        }
      );

      if (response.data.success === true) {
        // Save the token to local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.user._id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("projects", response.data.user.projects);
        navigate("/dashboard");
      } else {
        const { message } = response.data;
        setErrors({});

        if (message === "Invalid email") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Invalid email",
          }));
        } else if (message === "Invalid password") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Invalid password",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: message || "Unexpected error occurred",
          }));
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({ general: "An error occurred. Please try again later." });
    }
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
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
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    onClick={() => navigate("/resetpassword")}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password ?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  onChange={handlePassword}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member ?
            <a
              onClick={() => navigate("/register")}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
