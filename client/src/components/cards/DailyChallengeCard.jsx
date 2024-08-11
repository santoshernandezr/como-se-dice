import React from 'react'
import { NavLink } from 'react-router-dom';

/**
 * Component that handles the creation of the daily challenge card in the ComoSeDiceMenu page.
 * The daily challenge card is composed of an 'a' tag that in turn will redirect the user to the 
 * daily challenge page.
 * 
 * @param { string } destination Path of the page in which the user will be redirected when they click the button.
 * @param { string } title Title of the card that will be used.
 * @param { string } body Body of the card.
 * 
 * @returns Daily challenge card component.
 */
export default function DailyChallengeCard({destination, title, body}) {
    return (
        <div className="h-[23vh] border-solid border border-sky-500 rounded-lg hover:border-dotted shadow-2xl">
            {/* The 'a' tag that will redirect the user to appropriate gamemode */}
            <div className="flex items-center justify-center h-full w-full">
                <NavLink to={destination} className="flex items-center justify-center h-full w-full text-center">
                    <h2 className='text-xl'>
                            {title}
                            <span> &rarr;</span>
                        
                            <p>
                                {body}
                            </p>
                        </h2>
                </NavLink>
            </div>
        </div>
    )   
}
