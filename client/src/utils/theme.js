export function getTheme() {
  const theme = localStorage.getItem("serene_theme");
  return theme === "dark" || theme === "light" ? theme : "light";
}

export function setTheme(theme) {
  localStorage.setItem("serene_theme", theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
