import { useNavigate } from 'react-router-dom';

/**
 * Component that handles the creation of the daily challenge card in the ComoSeDiceMenu page.
 * The daily challenge card is composed of a button that in turn will redirect the user to the 
 * daily challenge page.
 * 
 * @param { destination } - Name of the page in which the user will be redirected when they click the button.
 * @param { title } - Title of the button card that will be used.
 * @param { body } - Body of the button.
 * @returns 
 */
export default function CardWithGameMode(props) {

    let destination = props.destination;
    let title = props.title;
    let body = props.body;

    // Used to help us redirect the user when performing the 'onClick' action.
    const navigate = useNavigate();

    return (
        <div>
            {/* The button that will redirect the user to appropriate gamemode */}
            <div className="flex items-center justify-center">
                <button className="flex items-center justify-center h-full w-full" onClick={() => navigate({destination})}>
                    <h2 className="text-wrap">
                        {title}
                        <span> &rarr;</span>
                    
                        <p className="text-wrap">
                            {body}
                        </p>
                    </h2>
                </button>
            </div>
        </div>
    )   
}