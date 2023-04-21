export default function convertToLocalDate(dateString) {
  const mDate = new Date(dateString).toLocaleDateString();
  const [d, m, y] = mDate.split("/");

  return `${d < 10 ? "0" + d : d}/${m < 10 ? "0" + m : m}/${y}`;
}
