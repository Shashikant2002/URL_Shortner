const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = date.getUTCMilliseconds();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  const formattedDate = `${String(day).padStart(2, "0")}/${String(
    month
  ).padStart(2, "0")}/${year}`;

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}${ampm}`;

  //   :${String(seconds).padStart(2, "0")}.${String(milliseconds
  //   ).padStart(3, "0")} ${ampm}`;

  return `${formattedDate}, ${formattedTime}`;
};

exports.formatDateTime = formatDateTime;
