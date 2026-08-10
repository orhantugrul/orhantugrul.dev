const STORAGE_KEY = "theme";

/**
 * Flips the scheme and records the choice, which also stops the inline script
 * in app.html from following the OS from here on.
 */
export function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  } catch {
    // Storage blocked; the toggle still applies for this page view.
  }
}
