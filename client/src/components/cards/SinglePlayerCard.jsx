import React from 'react'
import ChooseGameModeModal from '../modals/ChooseGameModeModal.jsx';

/**
 * Component that handles the creation of the single player card in the ComoSeDiceMenu page.
 * The single player card is composed of a button that in turn calls a modal that will give the 
 * user the option of choosing 'Normal mode' or 'Timed mode'. The user is then redirected to the 
 * appropriate game mode chosen by the user.
 * 
 * @param { string } title Title of the button card that will be used.
 * @param { string } body Body of the button.
 * 
 * @returns Single player card.
 */
export default function SinglePlayerCard({title, body}) {
    return (
        <div className="h-[23vh] border-solid border border-sky-500 rounded-lg hover:border-dotted shadow-2xl">
            {/* The button that will trigger the modal. */}
            <div className="h-full flex items-center justify-center">
                <button onClick={() => document.getElementById("chooseGameModeModal").showModal()} className="flex items-center justify-center h-full w-full">
                    <h2 className='text-sm sm:text-base md:text-lg lg:text-xl'>
                        {title}
                        <span> &rarr;</span>
                    
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg mt-2">
                            {body}
                        </p>
                    </h2>
                </button>
            </div>

            <ChooseGameModeModal />

        </div>
    )
}
