export function calculateStreak(moods = []) {
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

export function calculateLongestStreak(moods = []) {
  if (!moods || moods.length === 0) {
    return 0;
  }

  const dateStrings = moods.map((entry) => entry.date);
  const uniqueDates = [...new Set(dateStrings)];
  uniqueDates.sort((a, b) => new Date(a) - new Date(b));

  let currentRun = 1;
  let longestRun = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]);
    const currDate = new Date(uniqueDates[i]);
    if (currDate - prevDate === 86400000) {
      currentRun++;
    } else {
      currentRun = 1;
    }
    longestRun = Math.max(longestRun, currentRun);
  }

  return longestRun;
}
