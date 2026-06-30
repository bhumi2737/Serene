export function isNotificationSupported() {
  return typeof window !== "undefined" && "Notification" in window;
}

export async function requestNotificationPermission() {
  if (!isNotificationSupported()) return "denied";
  return await Notification.requestPermission();
}

export function getNotificationPrefs() {
  const enabledStr = localStorage.getItem("serene_notif_enabled");
  const time = localStorage.getItem("serene_notif_time") || "20:00";
  return {
    enabled: enabledStr === "true",
    time
  };
}

export function setNotificationPrefs(enabled, time) {
  localStorage.setItem("serene_notif_enabled", String(enabled));
  localStorage.setItem("serene_notif_time", time);
}

export function checkAndFireReminder() {
  const prefs = getNotificationPrefs();
  if (!prefs.enabled) return;

  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const currentTime = `${hh}:${mm}`;

  if (currentTime !== prefs.time) return;

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  const lastFired = localStorage.getItem("serene_notif_last_fired");
  if (lastFired === todayStr) return;

  const storedMoods = localStorage.getItem("serene_moods");
  const moods = storedMoods ? JSON.parse(storedMoods) : [];
  const hasLoggedToday = moods.some((entry) => entry.date === todayStr);
  if (hasLoggedToday) return;

  if (isNotificationSupported() && Notification.permission === "granted") {
    const notification = new Notification("Time to check in 🌿", {
      body: "You haven't logged your mood today. Take a quiet moment for yourself.",
      icon: "/favicon.ico"
    });
    notification.onclick = () => {
      window.focus();
    };
    localStorage.setItem("serene_notif_last_fired", todayStr);
  }
}
