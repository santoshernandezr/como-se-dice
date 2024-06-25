import React from 'react'

function HighScoreModal(props) {
    let bestScore = props.bestScore;
    let playAgain = props.playAgain;
    
  return (
    <div>
        {/* 
            Dialog that will show up at the end of the game if the user got a new high score. It will inform the user
            that they got a new high score.
        */}
        <dialog id="timedGameModeModal" className="rounded-lg max-w-lg border modal fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-fit">
            <div className="modal-box max-h-full max-w-full">

                <div className="max-w-l p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New high score</h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">pollo.io</p>
                    <p id="userOficialHighScore" className="mb-3 font-normal text-gray-700 dark:text-gray-400">New High Score: {bestScore} </p>

                    <div className="justify-center items-center flex space-x-28">
                        <a href="/comosedice" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Home
                        </a>
                        {/* <a href="/timedgamemode" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Play again
                        </a> */}
                        <button onClick={() => playAgain()} id="modalPlayAgainButton" type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Play again</button>

                    </div>
                </div>

            </div>
        </dialog>
    </div>
  )
}

export default HighScoreModal