import React from 'react'
import WorkInProgressImage from '../../images/work-in-progress.png'

/**
 * Component that handles the creation of the work in progress image that all the in progress pages will have.
 * @returns 
 */
function WorkInProgress() {
  return (
    <div>
        <div className='pt-36 flex justify-center'> 
            <img className="animate-bounce w-1/4 h-1/4" src={WorkInProgressImage} alt=""></img>
        </div>
    </div>
  )
}

export default WorkInProgress