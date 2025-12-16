import React from 'react'
import { Tooltip } from 'react-tooltip'

/**
 * Component responsible for creation of the grayed out cards, i.e. Multiplayer and join multiplayer room which will come in v2 of como se dice.
 * @param { String  } title Title of the card 
 * @param { String  } body Body of the card 
* @returns Coming soon card.
 */
function ComingSoonCard({title, body}) {
  return (
    <div className="h-[23vh]  border-solid border border-sky-500 rounded-lg shadow-2xl grayscale-0">
        {/* This is the <a> tag that will have the tags for the tooltip, id, content (message), and how long the message will show. */}
        <a data-tooltip-id="my-tooltip" data-tooltip-content="Coming in ¿cómo se dice? 2.0" data-tooltip-delay-hide={300}>
            <div className="flex items-center justify-center h-full w-full">
                <div className="flex items-center justify-center h-full w-full text-center">
                <h2 className='text-sm sm:text-base md:text-lg lg:text-xl text-gray-400'>                            {title}
                            <span> &rarr;</span>
                        
                            <p>
                                {body}
                            </p>
                        </h2>
                </div>
            </div>
        </a>

        {/* This is what makes the tooltip work. This will bet the id of the <a> tag and will show the message that is specified in the a tag */}
        <Tooltip id="my-tooltip"></Tooltip>
        
    </div>
  )
}

export default ComingSoonCard