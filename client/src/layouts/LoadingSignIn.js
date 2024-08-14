import React from "react";
import ClipLoader from "react-spinners/FadeLoader";

/**
 * Component responsible for the loading screen when the user is waiting to be signed in.
 *
 * @returns Sign in loading component.
 */
function LoadingSignIn() {
  return (
    <div className="place-content-center mx-auto">
      <div className="h-screen flex flex-col justify-center items-center">
        <h2 className="font-mono pb-6">Signing into ¿Cómo se dice?</h2>
        <ClipLoader></ClipLoader>
      </div>
    </div>
  );
}

export default LoadingSignIn;
