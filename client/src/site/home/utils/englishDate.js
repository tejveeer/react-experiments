// chatgpt
export default function getEnglishDate(dateString) {
  const date = new Date(dateString);

  // Get the day with ordinal suffix
  const day = date.getUTCDate();
  const dayWithSuffix = getDayWithSuffix(day);

  // Get the month and year
  const options = { month: 'long' };
  const month = date.toLocaleDateString('en-US', options);
  const year = date.getUTCFullYear();

  return `${month} ${dayWithSuffix}, ${year}`;
}

function getDayWithSuffix(day) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = day % 100;
  return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

const dateString = "2024-07-09T18:30:00.000Z";
const englishDate = getEnglishDate(dateString);
