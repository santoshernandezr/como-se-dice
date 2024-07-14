import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Component responsible for the creation of the modal that will ask the user to pick a single
 * player game mode, either normal or timed mode.
 * 
 * @returns Choose game mode modal.
 */
export default function ChooseGameModeModal() {
  return (
    <div>
        {/* 
            Dialog that will show up when the user picks single player mode.
        */}
        <dialog id="chooseGameModeModal" className="rounded-lg max-w-lg border modal fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-fit">
            <div className="modal-box max-h-full max-w-full">

                {/* Dialog header. */}
                <div className="max-w-l p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-center items-center">
                        <h5 className="mb-2 pl-12 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Choose single player game mode!</h5>
                        <button onClick={() => document.getElementById("chooseGameModeModal").close()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    
                    {/* Two game modes the user can choose from, normal or timed game mode. */}
                    <ul className="space-y-4 mb-4 pt-6">
                        <li>
                            {/* Normal game mode option. When clicked user should be redirected to the normal game page. */}
                            <NavLink to="/comosedice/normalgamemode" className="inline-flex items-center justify-center w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                <div className="block">
                                    <p className="w-full text-xl font-semibold">Normal mode</p>
                                    <p className="w-full text-xs text-gray-500 dark:text-gray-400">Get 10 word correct without running out of lives!</p>
                                </div>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/comosedice/timedgamemode" className="inline-flex items-center justify-center w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                            <   div className="block">
                                    <p className="w-full text-xl font-semibold">Timed mode</p>
                                    <p className="w-full text-xs text-gray-500 dark:text-gray-400">How many words can you get in 60 seconds?</p>
                                </div>
                            </NavLink>
                        </li>             
                    </ul>
                    
                </div>

            </div>
        </dialog>
    </div>
  )
}
