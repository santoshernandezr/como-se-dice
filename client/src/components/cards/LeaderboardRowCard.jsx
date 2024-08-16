import React from 'react'

function LeaderboardRowCard({profilePicture, username, email, bestScore, rank}) {
  return (
    <div className="flex justify-center">
        <ul className="divide-gray-200 divide-y pt-2">
            <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-10 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                        <img className="w-10 h-10 rounded-full" src={ profilePicture } alt=""></img>
                    </div>
                    <div className="flex-1 w-64 pr-20">
                        <p className="text-sm font-medium truncate dark:text-slate-950">
                        { username }
                        </p>
                        <p className="text-sm truncate dark:text-slate-500">
                        { email }
                        </p>
                    </div>
                    <div className="flex-1 w-32">
                        <p className="text-sm font-medium truncate dark:text-slate-950">
                        Rank: { rank }
                        </p>
                        <p className="text-sm truncate dark:text-slate-500">
                        Best score: {bestScore}
                        </p>
                    </div>
                </div>
            </li>
        </ul>
        
    </div>
  )
}

export default LeaderboardRowCard