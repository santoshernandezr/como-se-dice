/**
 * Validate strings are alphanumeric.
 * 
 * @param { String } string which is being validated.
 * @returns true or false whether or not the string is alphanumeric.
 */
export function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}