import React from 'react'

/**
 * Component that handles the creation of the single player card in the ComoSeDiceMenu page.
 * The single player card is composed of a button that in turn calls a modal that will give the 
 * user the option of choosing 'Normal mode' or 'Timed mode'. The user is then redirected to the 
 * appropriate game mode chosen by the user.
 * 
 * @param { title } - Title of the button card that will be used.
 * @param { body } - Body of the button.
 * @returns Single player card.
 */
export default function SinglePlayerCard(props) {

    let title = props.title;
    let body = props.body;

    return (
        <div className="h-[23vh] border-solid border border-sky-500 rounded-lg hover:border-dotted shadow-2xl">
            {/* The button that will trigger the modal. */}
            <div className="h-full flex items-center justify-center">
                <button className="flex items-center justify-center h-full w-full" data-modal-target="select-modal" data-modal-toggle="select-modal">
                    <h2 className='text-xl'>
                        {title}
                        <span> &rarr;</span>
                    
                        <p>
                            {body}
                        </p>
                    </h2>
                </button>
            </div>

            {/* Main modal*/}
            <div id="select-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">

                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Select game mode!
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="p-4 md:p-5">                            
                            <ul className="space-y-4 mb-4">

                                <li>
                                    {/* Normal game mode option. When clicked user should be redirected to the normal game page. */}
                                    <a href="/normalgamemode" className="inline-flex items-center justify-center w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">                           
                                        <div className="block">
                                            <p className="w-full text-lg font-semibold">Normal mode</p>
                                            <p className="w-full text-xs text-gray-500 dark:text-gray-400">Get 10 word correct without running out of lives!</p>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    {/* Timed game mode option. When clicked user should be redirected to the timed game page. */}
                                    <a href="/timedgamemode" className="inline-flex items-center justify-center w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                        <div className="block">
                                            <p className="w-full text-lg font-semibold">Timed mode</p>
                                            <p className="w-full text-xs text-gray-500 dark:text-gray-400">How many words can you get in 60 seconds?</p>
                                        </div>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>

                    </div>
                </div>
            </div> 

        </div>
    )
}