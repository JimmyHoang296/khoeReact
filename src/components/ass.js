export default function convertToLocalDate(dateString) {
  const mDate = new Date(dateString);
  const d = mDate.getDate();
  const m = mDate.getMonth() + 1;
  const y = mDate.getFullYear();

  return `${d < 10 ? "0" + d : d}/${m < 10 ? "0" + m : m}/${y}`;
}
