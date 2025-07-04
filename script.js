// Import components
import { loadHeaderComponent } from "./components/header.js";
import {
  loadCountdownComponent,
  initCountdown,
} from "./components/countdown.js";

// When the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
  // Insert the header component into the page
  const headerContainer = document.getElementById("header-container");
  headerContainer.innerHTML = await loadHeaderComponent();

  // Insert the countdown component into the page
  const countdownContainer = document.getElementById("countdown-container");
  countdownContainer.innerHTML = await loadCountdownComponent();

  /**
   * The target date for the countdown timer (June 19, 2026)
   * @type {Date}
   */
  const targetDate = new Date("2026-06-19T23:59:59");

  // Initialize the countdown
  initCountdown(targetDate);
});
