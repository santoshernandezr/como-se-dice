import React from 'react'
import Emoji from "../common/Emoji.jsx"

/**
 * Component responsible for the creation of what the user will see when they have completed the daily challenge. 
 * They will get a message saying they completed the daily challenge, their stats, and their previous 5 daily challenge stats.
 * @returns DailyChallengeComplete component.
 */
function DailyChallengeComplete({userData}) {
    const allHistory = userData.dailyChallengeMode.history // Gets the entire history of the user
    const currentDay = allHistory[0]; // Gets the first element of the users history which will be the most current daily challenge they completed.

    let history;
    // Sometimes the database gets wonky and the length gets longer than 6, so we just want to make sure we only get the past 5 days, i.e. index 1-6.
    if (allHistory.length > 6) {
        history = allHistory.slice(1, 6)
    } else {
        history = allHistory.slice(1, allHistory.length)
    }

    let historyList = [];

    // Iterate through the history of the users daily challenges, and insert every instance into an individual 'li' tag.
    history.forEach((item, index) => {
        historyList.push(
            <li className="py-1 sm:py-3" key={index}>
                <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {item.date}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Time: {item.time}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {item.score}/10
                    </div>
                </div>
            </li>
        )
    })


  return (
    <div className="flex flex-col items-center">
        {/* Heading conntainer daily challenge completion and stats. */}
        <h1 className="mt-1 font-extrabold leading-none tracking-tight lg:text-4xl dark:text-black">Daily challenge completed</h1>
        <h1 className="mt-2 font-bold">{currentDay.date} stats:</h1>
        <h1 className="font-bold">Score: {currentDay.score}</h1>
        <h1 className="font-bold">Time: {currentDay.time}</h1>

        <p className="mb-4 mt-2 font-normal text-gray-500 lg:text-l sm:px-16 xl:px-48 dark:text-black">Come back tomorrow for another fun daily challenge <Emoji symbol="😃"></Emoji></p>

        {/* List containing the users 5 previous daily challenges. */}
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Daily Challenges</h5>
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">

                    {history.length == 0 ? <div className="dark:text-gray-400">Welcome to ¿Cómo se dice? daily challenge! See your stats from your previous 5 daily challenges  here!</div> : historyList}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default DailyChallengeComplete