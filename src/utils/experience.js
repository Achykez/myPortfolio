const dateString = "2022-03-15";
const howLongAgo = (genie) => {
  const today = new Date();
  const targetDate = new Date(genie);

  const yearsDiff = today.getFullYear() - targetDate.getFullYear();
  const monthsDiff = today.getMonth() - targetDate.getMonth();

  let totalMonths = yearsDiff * 12 + monthsDiff;

  if (today.getDate() < targetDate.getDate()) {
    totalMonths -= 1;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months };
};
export const genesys = howLongAgo(dateString);
