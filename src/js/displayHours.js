export default function displayHours(hours) {
  if (typeof hours !== "number" || isNaN(hours)) {
    return "00:00";
  }
  const hoursInt = parseInt(hours);
  let minutes = 0;
  hoursInt > 0 ? (minutes = Math.floor((hours % hoursInt) * 60)) : (minutes = Math.floor(hours * 60));
  const hoursString =
    hoursInt > 10 ? hoursInt.toString() : "0" + hoursInt.toString();

  let minutesString = minutes.toString();
  if (minutes === 0 || typeof minutes !== "number" || isNaN(minutes))
    minutesString = "00";
  else
    minutesString =
      minutes > 10 ? minutes.toString() : "0" + minutes.toString();

  const resultString =
    hoursInt > 0
      ? minutes > 0
        ? `${hoursString}:${minutesString}`
        : `${hoursString}:00`
      : `00:${minutesString}`;

  return resultString;
}
