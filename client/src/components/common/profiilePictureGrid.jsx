import React from "react";
// Images the user can choose from. TODO: Get from database when ready.
import camel from '../../images/comoSeDiceAvatars/camel.png';
import cow from '../../images/comoSeDiceAvatars/cow.png';
import gorilla from '../../images/comoSeDiceAvatars/gorilla.png';
import leopard from '../../images/comoSeDiceAvatars/leopard.png';
import lion from '../../images/comoSeDiceAvatars/lion.png';
import mouse from '../../images/comoSeDiceAvatars/mouse.png';
import octopus from '../../images/comoSeDiceAvatars/octopus.png';
import panda from '../../images/comoSeDiceAvatars/panda.png';
import penguin from '../../images/comoSeDiceAvatars/penguin.png';
import rabbit from '../../images/comoSeDiceAvatars/rabbit.png';
import shark from '../../images/comoSeDiceAvatars/shark.png';
import snake from '../../images/comoSeDiceAvatars/snake.png';

/**
 * Component that handles the creation of the modal and the profile picture grid.
 * 
 * @param { function } setProfilePicture Function that will allow us to set the state of the profile picture.
 */
export default function Counter({setProfilePicture}) {
    const images = [camel, cow, gorilla, leopard, lion, mouse, octopus, panda, penguin, rabbit, shark, snake]

    let itemList=[];

    images.forEach((item, index)=>{
        itemList.push( 
        <div key={index} className="flex items-center justify-center">
            <a id="link" onClick={() => {setProfilePicture(item); document.getElementById('profilePictureGridModal').close()}} href="#">  <img className="h-20 rounded-lg max-w-xs border" src={item} alt=""></img></a>
        </div>)
    })

    return (
        <div>
            <div className="flex items-center justify-center">
            <button className="btn w-28 bg-gray-700 hover:bg-gray-500 text-white text-sm rounded text-center mt-2" type="button" onClick={() => document.getElementById('profilePictureGridModal').showModal()}>Profile picture</button>
            </div>
            <dialog id="profilePictureGridModal" className="rounded-lg max-w-lg border modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 m-4">
                        {itemList}
                    </div>
                </div>
            </dialog>
        </div>
    );
}