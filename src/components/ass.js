export default function convertToLocalDate(dateString) {
  const mDate = new Date(dateString).toLocaleDateString();
  const [m, d, y] = mDate.split("/");

  return `${d < 10 ? "0" + d : d}/${m < 10 ? "0" + m : m}/${y}`;
}
