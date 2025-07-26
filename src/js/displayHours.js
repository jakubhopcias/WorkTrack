export default function displayHours(hours) {
  if (typeof hours !== "number" || isNaN(hours)) {
    return "0 h";
  }
  const hoursInt = parseInt(hours);
  let minutes = 0;
  hoursInt > 0 ? (minutes = Math.floor((hours % hoursInt) * 60)) : (minutes = Math.floor(hours * 60));
  const hoursString =
    hoursInt.toString()

  let minutesString = minutes.toString();
  if (minutes === 0 || typeof minutes !== "number" || isNaN(minutes))
    minutesString = "0";
  else
    minutesString.toString()

  const resultString =
    hoursInt > 0
      ? minutes > 0
        ? `${hoursString} h ${minutesString} min`
        : `${hoursString}h`
      : `${minutesString} min`;

  return resultString;
}
