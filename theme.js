(function () {
  const storageKey = 'mostafa-studio-theme';
  const buttonSelector = '.theme-toggle';

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');

    document.querySelectorAll(buttonSelector).forEach((button) => {
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function loadTheme() {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('DOMContentLoaded', function () {
    const initialTheme = loadTheme();
    applyTheme(initialTheme);

    document.querySelectorAll(buttonSelector).forEach((button) => {
      button.addEventListener('click', function () {
        const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem(storageKey, nextTheme);
        applyTheme(nextTheme);
      });
    });
  });
})();
