import React from 'react'

/**
 * Component that handles the creation of the daily challenge card in the ComoSeDiceMenu page.
 * The daily challenge card is composed of an 'a' tag that in turn will redirect the user to the 
 * daily challenge page.
 * 
 * @param { destination } - Name of the page in which the user will be redirected when they click the button.
 * @param { title } - Title of the card that will be used.
 * @param { body } - Body of the card.
 * @returns 
 */
export default function CardWithGameMode(props) {

    let destination = props.destination;
    let title = props.title;
    let body = props.body;

    return (
        <div>
            {/* The 'a' tag that will redirect the user to appropriate gamemode */}
            <div className="flex items-center justify-center h-full w-full">
                <a href={destination} className="flex items-center justify-center h-full w-full text-center">
                    <h2>
                        {title}
                        <span> &rarr;</span>
                    
                        <p>
                            {body}
                        </p>
                    </h2>
                </a>
            </div>
        </div>
    )   
}