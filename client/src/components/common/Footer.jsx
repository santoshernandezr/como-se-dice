import React from 'react'

/**
 * Component that handles the cretion of the footer that will go in all of the pages of the game.
 * 
 * @returns Footer for the Como se dice game.
 */
export default function Footer() {
  return (
    <div>
        <footer className="bg-white dark:bg-gray-900 fixed bottom-0 w-screen">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-4">
                
            <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-xs text-gray-500 sm:text-center dark:text-gray-400">
                  © 2023 Cómo Se Dice. All Rights Reserved. Developed by <strong>Gerardo Soto</strong> and <strong>Roberto Santos Hernandez</strong>. Icons used were made by <strong><a href='href="https://www.flaticon.com/free-icons/work-in-progress"'>Freepik</a></strong> <strong><u><a href="https://www.flaticon.com/authors/darius-dan">Darius Dan</a></u></strong> and <strong><u><a href="https://www.flaticon.com/authors/wahyu-adam">Wahyu Adam</a></u></strong>.
                </span>
            </div>
            </div>
        </footer>
    </div>
  )
}
