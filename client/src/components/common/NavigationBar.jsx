import '../../css/App.css';
import user from '../../images/user.png';
import { NavLink } from 'react-router-dom';

/**
 * Component that handles the creation of the navigation bar. The navigation bar consists of the title of the game,
 * a home button that will take the user to the como se dice menu, a leadboard button that will take them to the leaderboard
 * page, and a user avatar dropdown that contains the users info and a sign out button.
 * 
 * @returns the navigation bar that will be used in ALL pages of the pages.
 */
function NavigationBar() {
    return (
        <div className="NavigationBar">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 mx-auto">

                    <div className="flex space-x-3 items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">¿cómo se dice?</span>
                    </div>
                    
                    <div className="flex items-center md:order-2 w-8">

                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src={user} alt=""></img>
                        </button>

                        {/* Drop down menu*/}
                        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white"> pollo.io </span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400"> robertos.0917@gmail.com </span>
                            </div>
                            
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                <form action="/api/auth/signout">
                                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" type="submit">Sign out</button>
                                </form>
                                </li>
                            </ul>
                        </div>
                        
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                        </button>
                    </div>

                    <div className="md:flex md:w-auto md:order-1  " id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink to="/comosedice/menu" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/comosedice/dailychallenge" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Leaderboard</NavLink>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavigationBar;