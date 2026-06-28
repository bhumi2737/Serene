export function calculateStreak() {
  const stored = localStorage.getItem("serene_moods");
  const moods = stored ? JSON.parse(stored) : [];

  let streak = 0;
  let checkDate = new Date();

  while (true) {
    const year = checkDate.getFullYear();
    const month = String(checkDate.getMonth() + 1).padStart(2, "0");
    const day = String(checkDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const hasEntry = moods.some((entry) => entry.date === dateString);
    if (hasEntry) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
