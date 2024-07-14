import "../css/App.css";
import workInProgressImage from "../images/work-in-progress.png";

/**
 * Coming soon page. Will show this page whenever a page is in progress.
 *
 * @returns Coming soon page.
 */
function ComingSoon() {
  return (
    <div className="h-full">
      {/* Work in progress image  */}
      <div className="pt-36 flex justify-center">
        <img
          className="animate-bounce w-1/4 h-1/4"
          src={workInProgressImage}
          alt=""
        ></img>
      </div>
    </div>
  );
}

export default ComingSoon;
