const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const POSTOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Will randomize an array so we can get a random array everytime.
 *
 * @param array Array to be shuffled.
 * @returns randomized array.
 */
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

/**
 * Will return a cron format value.
 *
 * @param { string } seconds
 * @param { string } minute
 * @param { string } hour
 * @param { string } dayOfMonth
 * @param { string } month
 * @param { string } dayOfWeek
 * @returns Cron format value.
 */
function createCronDatetime(
  seconds,
  minute,
  hour,
  dayOfMonth,
  month,
  dayOfWeek
) {
  return (
    seconds +
    " " +
    minute +
    " " +
    hour +
    " " +
    dayOfMonth +
    " " +
    month +
    " " +
    dayOfWeek
  );
}

/**
 * Function that will format our date in the following format '8/2/2024 9:05:00 PM'
 *
 * @param { Date object} dateObject Date object that will be reformated.
 * @returns Formated date.
 */
function formatDate(dateObject) {
  day = dateObject.getDate();
  month = dateObject.getMonth();
  year = dateObject.getFullYear();
  hour = dateObject.getHours() % 12 || 12;
  minute = dateObject.getMinutes().toString().padStart(2, "0");
  seconds = dateObject.getSeconds().toString().padStart(2, "0");
  amOrPm = dateObject.getHours() < 12 ? "AM" : "PM";

  return (
    month +
    "/" +
    day +
    "/" +
    year +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    seconds +
    " " +
    amOrPm
  );
}

/**
 * Function that will get todays date and puts it in the following format:
 * <day>, <month>/<date>: example: Saturday, 7/20
 * @returns Todays date in <day>, <month>/<date> format.
 */
function getDate() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const currentDate =
    days[date.getDay()] + ", " + month.toString() + "/" + day.toString();
  return currentDate;
}

/**
 * Function that will get yesterdays date and put it in the following format:
 * <day>, <month>/<date>: example: Saturday, 7/20
 * @returns Yesterdays date in <day>, <month>/<date> format.
 */
function getPreviousDay() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const previousDay =
    days[date.getDay()] + ", " + month.toString() + "/" + day.toString();

  return previousDay;
}

module.exports = {
  shuffle,
  createCronDatetime,
  formatDate,
  getDate,
  getPreviousDay,
  POSTOptions,
};
