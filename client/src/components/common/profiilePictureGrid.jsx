import React from "react";

/**
 * Component that handles the creation of the modal and the profile picture grid.
 * 
 * @param { form state } form Form state. JSON object that contains the users details, i.e. name, username, etc.
 * @param { function } setForm Function to set the state of form. Will be used to update the profile picture field.
 * @param { pictureList state } pictureList State of the 'pictureList'. Contains the images retrieved from the database.
 */
export default function Counter({form, setForm, pictureList}) {
    // List where all the individual pictures will go and then shown in the modal.
    let itemList=[];

    // Going through each item in pictureList to retreive each picture to put them in an a tag.
    pictureList.forEach((item, index)=>{
        itemList.push( 
        <div key={index} className="flex items-center justify-center">
            {/* On click, set ONLY the profile picture field. */}
            <a id="link" onClick={() => {setForm({...form, profilePicture: item.base64Image}); document.getElementById('profilePictureGridModal').close()}} href="#">  
                <img className="h-20 rounded-lg max-w-xs border" src={item.base64Image} alt=""></img>
            </a>
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