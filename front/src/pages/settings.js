import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const id = localStorage.getItem("id");

  // change password
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

  const handleSave = (event) => {
    event.preventDefault();
         axios.put(
          `https://pwa-backend-2c14dae9b4e4.herokuapp.com/users/${id}`,
          {
            username,
            email,
            notification: notificationEnabled,
          }
        ).then((response) => {
          if (response.data.success === true) {
            localStorage.setItem("email", email);
            localStorage.setItem("username", username);
            toast("Settings changed");
          }
        })
  }

  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        // Notifications are allowed
        setNotificationEnabled(true);
      } else if (Notification.permission === "denied") {
        // Notifications are blocked
      } else {
        // Notifications are not denied or granted yet, can prompt the user
      }
    }
  }, []);

  const handleCheckboxChange = async () => {
    setNotificationEnabled(!notificationEnabled);

    // Request notification permission if enabling notifications
    if (!notificationEnabled) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setNotificationEnabled(true);
          subscribeUserToPush();
        } else {
          setNotificationEnabled(false);
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        setNotificationEnabled(false);
      }
    }
  };

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const buffer = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      buffer[i] = rawData.charCodeAt(i);
    }

    return buffer;
  }

  const subscribeUserToPush = () => {
    navigator.serviceWorker.ready.then(async (registration) => {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BOUfXxr7xEFzcjeXmvOFvbdsXosthzgbO5pyAUTWJ76XQ2fOLP0iau6ptvpdNyOVf-inaM3JIr9dXIE5f3oV3uE"
        ),
      });

      axios
        .post(
          `https://pwa-backend-2c14dae9b4e4.herokuapp.com/subscribe/${id}`,
          {
            subscription: subscription,
          }
        )
        .then((response) => {});
    });
  };

  return (
    <div class="md:h-screen h-fit flex">
      <div class="w-full  m-4 flex items-center">
        <div class="mx-1 my-4 md:h-fit bg-white border border-gray-300 w-full shadow-2xl rounded-3xl shadow-slate-600">
          <ToastContainer />
          <div className="bg-indigo-500 rounded-xl shadow-md p-2 m-2">
            <h1 className="text-white text-xl font-bold">Edit profil</h1>
          </div>
          <form onSubmit={handleSave}>
            <div class="m-3">
              <div class="border-b border-gray-900/10 pb-6">
                <h2 class="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
                <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <label
                      for="username"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div class="md:mt-2">
                      <input
                        onChange={handleUsername}
                        value={username}
                        type="text"
                        name="username"
                        id="username"
                        required
                        autocomplete="given-name"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label
                      for="email"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div class="md:mt-2">
                      <input
                        onChange={handleEmail}
                        value={email}
                        type="text"
                        name="email"
                        id="email"
                        autocomplete="family-name"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="border-b border-gray-900/10 pb-3">
                <h2 class="text-base font-semibold leading-7 text-gray-900 pt-3">
                  Notifications
                </h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">
                  We'll always let you know about important changes, but you
                  pick what else you want to hear about.
                </p>

                <div class="mt-2 space-y-4">
                  <fieldset>
                    <div class="mt-2 space-y-6">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input
                            id="everything"
                            name="everything"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 accent-indigo-600"
                            checked={notificationEnabled}
                            onChange={handleCheckboxChange}
                          />
                        </div>

                        <div class="text-sm leading-6">
                          <label
                            for="everything"
                            class="font-medium text-gray-900"
                          >
                            Everything
                          </label>
                          <p class="text-gray-500">
                            Receive all push notifications.
                          </p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div class="m-3 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                class="rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
