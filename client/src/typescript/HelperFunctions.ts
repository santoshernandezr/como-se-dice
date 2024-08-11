/**
 * Validate strings are alphanumeric.
 * 
 * @param { String } str String being validated.
 * @returns true or false whether or not the string is alphanumeric.
 */
export function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/**
 * Function that will turn the enuemerated date from the date object into a day of the week.
 *
 * @param enumeratedDay Enumerated day coming from the date object.
 * @returns Day of the week value.
 */
export function getDayOfTheWeek(enumeratedDay) {
    return days[enumeratedDay - 1];
}