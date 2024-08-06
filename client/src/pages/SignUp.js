import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProfilePictureGridModal from "../components/common/profiilePictureGrid.jsx";
import user from "../images/user.png";
import axios from "axios";

/**
 * Component that handles the creation of the sign up form page. The page will ask the user to pick a profile picture,
 * their name, username, email, and password.
 *
 * @returns Component that handles the user signing up.
 */
function SignUp() {
  // Method that will allow us to navigate to other pages.
  const navigate = useNavigate();

  // Instantiate the 'pictureList' state. This state will be used to save the list of pictures retreived from the database.
  const [pictureList, setPictureList] = useState();

  // Use effect that ONLY renders ONCE. Will retrieve the images from the database and add them to the 'pictureList' state.
  useEffect(() => {
    axios.get("/images/getAllImages").then((response) => {
      setPictureList(response.data);
    });
  }, []);

  // Instantiating the form state. This state will contain an object with the form values.
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profilePicture: user,
  });

  // Function that will be called when a field changes and update the forms correct values state.
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Instantiate the alert states.
  const [usernameAlert, setUsernameAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);

  // Conditional useEffect. If the username is already used, set username alert.
  useEffect(() => {
    /*
    Check if the username is not empty, i.e. length is greater than 0. Since '/users/usernameExists/' is a dynamic
    endpoint, we don't want to send form.username if it is an empty string.
    */
    if (form.username.length > 0) {
      axios.get("/users/usernameExists/" + form.username).then((response) => {
        if (response.data.usernameAvailable) {
          setUsernameAlert(false);
        } else {
          setUsernameAlert(true);
        }
      });
    }
  }, [form.username]);

  // Conditional useEffect. If the email is already used, set email alert.
  useEffect(() => {
    /*
    Check if the email is not empty, i.e. length is greater than 0. Since '/users/emailExists/' is a dynamic
    endpoint, we don't want to send form.email if it is an empty string.
    */
    if (form.email.length > 0) {
      axios.get("/users/emailExists/" + form.email).then((response) => {
        if (response.data.emailAvailable) {
          setEmailAlert(false);
        } else {
          setEmailAlert(true);
        }
      });
    }
  }, [form.email]);

  /*
   Function that will be called to verify if the user is ready to be created. If the user has chosen a 
   username and email that has not been taken, then call the sign up endpoint to add user.
   */
  async function verifyNewAccount(e) {
    e.preventDefault();
    if (
      usernameAlert !== true &&
      emailAlert !== true &&
      form.profilePicture !== user
    ) {
      axios.put("/users/signup", form).then((response) => {
        if (response.status === 200) {
          navigate("/signin");
        }
      });
    }
  }

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
                    src={form.profilePicture}
                    className="w-24 h-24 shadow-lg hover:opacity-40"
                    alt=""
                  ></img>
                </div>

                {/* Grid that will show up when the user chooses his profile picture. */}
                {pictureList ? (
                  <ProfilePictureGridModal
                    form={form}
                    setForm={setForm}
                    pictureList={pictureList}
                  />
                ) : (
                  <div className="flex items-center justify-center">
                    <button
                      className="btn w-28 bg-gray-700 hover:bg-gray-500 text-white text-sm rounded text-center mt-2"
                      type="button"
                    >
                      Profile picture
                    </button>
                  </div>
                )}

                {/* Input fields: Name, username, email, and password */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    autoComplete="off"
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
                    onChange={handleChange}
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    autoComplete="off"
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
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="off"
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
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    autoComplete="off"
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
