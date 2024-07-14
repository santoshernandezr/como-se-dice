/**
 * Validate strings are alphanumeric.
 * 
 * @param { String } str String being validated.
 * @returns true or false whether or not the string is alphanumeric.
 */
export function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}