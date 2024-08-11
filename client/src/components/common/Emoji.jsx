import React from 'react';

/**
 * Component responsible to create the emoji render correctly. 
 * 
 * @param { * } props 
 * 
 * @returns Emoji component.
 */
export default function Emoji(props) {
    return (
        <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        >
            {props.symbol}
        </span>
    )
}