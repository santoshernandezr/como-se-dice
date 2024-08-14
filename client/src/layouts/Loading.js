import React from "react";
import ClipLoader from "react-spinners/FadeLoader";

/**
 * Component responsible for the loading screen when the user is waiting to be signed in.
 *
 * @param { String } message message that will be displayed in the h2 tag.
 * @returns Sign in loading component.
 */
function Loading({ message }) {
  return (
    <div className="place-content-center mx-auto">
      <div className="h-screen flex flex-col justify-center items-center">
        <h2 className="font-mono pb-4">{message}</h2>
        <ClipLoader></ClipLoader>
      </div>
    </div>
  );
}

export default Loading;
