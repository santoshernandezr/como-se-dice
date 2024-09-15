import '../../css/App.css';
import UserContext from "../../context/UserContext";
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
    const { user, isGuest, logout } = useContext(UserContext);

    /*
     Function that will call the 'logout' endpoint to log the user out, meaning it will terminate the session that
     was created when the user logged in. 
     */
    function loggingUserOut() {
        axios.get("/logout").then((response) => {
            // If session is terminated successfully, call 'logout' to empty the user context and navigate to the sign in page.
            if(response.data.loggedOut) {
                logout();
                navigate("/");
            }
        })
    }

    return (
        <div className="NavigationBar">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-col sm:flex-row items-center justify-between p-4">
                    <div className="flex items-center mb-2 sm:mb-0">
                        <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap dark:text-white">¿cómo se dice?</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <ul className="flex font-medium space-x-4">
                            <li>
                                <NavLink to="/comosedice/menu" className="block py-2 px-3 text-sm sm:text-base text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/comosedice/comingsoon" className="block py-2 px-3 text-sm sm:text-base text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Leaderboard</NavLink>
                            </li>
                        </ul>
                        <div className="relative">
                            <button onClick={() => {setOpen(!open)}} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false">
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src={user.profilePicture} alt="user avatar"></img>
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">{user.username}</span>
                                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            {!isGuest ? 
                                                <button onClick={() => {loggingUserOut()}} className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button> : 
                                                <NavLink to="/signup" className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Create account</NavLink>
                                            }
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
