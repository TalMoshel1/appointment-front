export const compareDates = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Jerusalem' };
  
  const formattedD1 = d1.toLocaleDateString('en-CA', options); // "YYYY-MM-DD"
  const formattedD2 = d2.toLocaleDateString('en-CA', options); // "YYYY-MM-DD"


  return formattedD1 === formattedD2;
};

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
  return date.toLocaleDateString('en-US', options);
}