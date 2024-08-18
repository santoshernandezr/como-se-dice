import '../../css/App.css';
import UserContext from "../../pages/UserContext";
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';

/**
 * Component that handles the creation of the navigation bar. The navigation bar consists of the title of the game,
 * a home button that will take the user to the como se dice menu, a leadboard button that will take them to the leaderboard
 * page, and a user avatar dropdown that contains the users info and a sign out button.
 * 
 * @returns the navigation bar that will be used in ALL pages of the pages.
 */
export default function NavigationBar() {
    // Method that will allow us to navigate to other pages.
    const navigate = useNavigate();
    // Instantiate the 'open' state that will help us determine if the dropdown is open or not.
    const [open, setOpen] = useState(false);
    // Getting the user context and the function to log the user out.
    const { user, logout } = useContext(UserContext);

    /*
     Function that will call the 'logout' endpoint to log the user out, meaning it will terminate the session that
     was created when the user logged in. 
     */
    function loggingUserOut() {
        axios.get("/logout").then((response) => {
            // If session is terminated successfully, call 'logout' to empty the user context and navigate to the sign in page.
            if(response.data.loggedOut) {
                logout();
                navigate("/signin");
            }
        })
    }

    return (
        <div className="NavigationBar">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 mx-auto">

                    <div className="flex space-x-3 items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">¿cómo se dice?</span>
                    </div>
                    
                    <div className="relative flex items-center md:order-2 w-8">

                        {/* Drop down button. */}
                        <button onClick={() => {setOpen(!open)}} type="button" className="flex right-0 mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src={user.profilePicture} alt=""></img>
                        </button>

                        {/* Drop down menu. */}
                        <div style={{display: open ? 'inline' : 'none'}} className="absolute -right-3 top-12 list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white"> {user.username} </span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400"> {user.email} </span>
                            </div>
                            {/* Drop down items. */}
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <button onClick={() => {loggingUserOut()}} className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Home and leaderboard button on the navigation bar. */}
                    <div className="md:flex md:w-auto md:order-1  " id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink to="/comosedice/menu" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/comosedice/comingsoon" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Leaderboard</NavLink>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
