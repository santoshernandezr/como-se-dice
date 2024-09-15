import React from 'react'

/**
 * Component that handles the cretion of the footer that will go in all of the pages of the game.
 * 
 * @returns Footer for the Como se dice game.
 */
export default function Footer() {
  return (
    <div className="w-full">
        <footer className="bg-white dark:bg-gray-900 fixed bottom-0 w-full">
            <div className="w-full p-4 py-6">
            <hr className="my-2 border-gray-200 dark:border-gray-700" />
            <div className="text-center">
                <span className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
                  © 2023 Cómo Se Dice. All Rights Reserved. Developed by <strong>Gerardo Soto</strong> and <strong>Roberto Santos Hernandez</strong>. Icons used were made by <strong><a href='https://www.flaticon.com/free-icons/work-in-progress' className="hover:underline">Freepik</a></strong>, <strong><a href="https://www.flaticon.com/authors/darius-dan" className="hover:underline">Darius Dan</a></strong> and <strong><a href="https://www.flaticon.com/authors/wahyu-adam" className="hover:underline">Wahyu Adam</a></strong>.
                </span>
            </div>
            </div>
        </footer>
    </div>
  )
}
