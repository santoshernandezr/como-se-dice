import React from 'react'
import userPicture from '../../images/user.png'
import UserContext from "../../pages/UserContext";
import { useContext } from "react";

/**
 * Component responsible for the creation of the users information, so their avatar image, score and lives count.
 * 
 * @param { int } score users score.
 * @param { int } lives users lives.
 * @returns 
 */
export default function PlayerInfo({score, lives}) {
  // Getting the user context.
  const { user } = useContext(UserContext);

  return (
    <div>
        <main>
            {/* The users information. Users avatar, username, lives and score count. */}
            <div className="flex flex-col items-center">
                <div className="w-full max-w-sm ">
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-32 h-32 mt-8 rounded-full shadow-lg" alt="" src={userPicture}></img>
                        <h5 className="mb-0 mt-4 text-xl font-medium dark:text-black">{user.username}</h5>
                        <div className="flex mt-2">
                            <p id="score" className="inline-flex items-center px-4 py-2 text-m font-medium text-center dark:text-black">Score: {score}</p>
                            <p id="numberOfLives" className="inline-flex items-center px-4 py-2 text-m font-medium text-center dark:text-black">Lives: {lives}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}
