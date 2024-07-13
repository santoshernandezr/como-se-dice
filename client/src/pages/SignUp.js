import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProfilePictureGridModal from "../components/signUp/profiilePictureGrid.jsx";
import user from "../images/user.png";

/**
 * Component that handles the creation of the sign up form page. The page will ask the user to pick a profile picture,
 * their name, username, email, and password.
 *
 * @returns Component that handles the user signing up.
 */
function SignUp() {
  // Instantiating user states that will be used to submit the form.
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(user);

  // Instantiate the alert states.
  const [usernameAlert, setUsernameAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);

  // Conditional useEffect. If the username is already used, set username alert.
  useEffect(() => {
    if (username == "pollo") {
      setUsernameAlert(true);
    } else {
      setUsernameAlert(false);
    }
  }, [username]);

  // Conditional useEffect. If the email is already used, set email alert.
  useEffect(() => {
    if (email == "testing@gmail.com") {
      setEmailAlert(true);
    } else {
      setEmailAlert(false);
    }
  }, [email]);

  async function verifyNewAccount() {}

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Create Como Se Dice account
              </h1>

              <form
                className="space-y-4 md:space-y-6"
                onSubmit={verifyNewAccount}
              >
                <div className="flex items-center justify-center">
                  <img
                    id="profilePicture"
                    src={profilePicture}
                    className="w-24 h-24 shadow-lg hover:opacity-40"
                    alt=""
                  ></img>
                </div>

                {/* Grid that will show up when the user chooses his profile picture. */}
                <ProfilePictureGridModal
                  setProfilePicture={setProfilePicture}
                />

                {/* Input fields: Name, username, email, and password */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  ></input>
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    className="bg-red-50 border border-red-300 text-red-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                    required
                  ></input>
                  <p
                    id="outlined_error_help"
                    style={{ display: usernameAlert ? "inline" : "none" }}
                    className="mt-2 text-xs text-red-600 dark:text-red-400"
                  >
                    <span className="font-medium">Username not available.</span>
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your remail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  ></input>
                  <p
                    id="outlined_error_help"
                    style={{ display: emailAlert ? "inline" : "none" }}
                    className="mt-2 text-xs text-red-600 dark:text-red-400"
                  >
                    <span className="font-medium">
                      Email already being used.
                    </span>
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  ></input>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Create account
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <NavLink
                    to="/signin"
                    className="font-medium text-blue-600 text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
