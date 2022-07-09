export function formatDate(d: Date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let formattedDate: string;
  let dd = d.getDate();
  let mm = d.getMonth() + 1;
  let day;
  if (dd < 10) {
    day = "0" + dd;
  } else day = dd;

  formattedDate = day + " " + monthNames[mm - 1];
  return formattedDate;
}

export function getLast10days(): any[] {
  var result = [];
  for (var i = 10; i > 0; i--) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(formatDate(d));
  }
  return result;
}

export function getDaysFromDatesArray(dates: any[]): any[] {
  var result = [];
  for (var i = dates.length; i > 0; i--) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(formatDate(d));
  }
  return result;
}
