/**
 * CountdownTimer - A class to manage countdown functionality
 */
class CountdownTimer {
  /**
   * Creates a new CountdownTimer instance
   * @param {Date} targetDate - The target date to countdown to
   * @param {Object} elements - DOM elements for displaying the countdown
   * @param {HTMLElement} elements.days - Element to display days
   * @param {HTMLElement} elements.hours - Element to display hours
   * @param {HTMLElement} elements.minutes - Element to display minutes
   * @param {HTMLElement} elements.seconds - Element to display seconds
   */
  constructor(targetDate, elements) {
    /** @private {Date} */
    this.targetDate = targetDate;

    /** @private {Object} */
    this.elements = elements;

    /** @private {number|null} */
    this.intervalId = null;
  }

  /**
   * Calculates the time remaining until the target date
   * @returns {Object} Time remaining object with days, hours, minutes, and seconds
   * @private
   */
  _calculateTimeRemaining() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      total: distance,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  /**
   * Updates the countdown display
   * @private
   */
  _updateCountdown() {
    const timeRemaining = this._calculateTimeRemaining();

    // Update DOM elements
    this.elements.days.textContent = this._formatTimeUnit(timeRemaining.days);
    this.elements.hours.textContent = this._formatTimeUnit(timeRemaining.hours);
    this.elements.minutes.textContent = this._formatTimeUnit(
      timeRemaining.minutes,
    );
    this.elements.seconds.textContent = this._formatTimeUnit(
      timeRemaining.seconds,
    );

    // Check if countdown has expired
    if (timeRemaining.total <= 0) {
      this.stop();
      this.elements.days.textContent = "00";
      this.elements.hours.textContent = "00";
      this.elements.minutes.textContent = "00";
      this.elements.seconds.textContent = "00";
    }
  }

  /**
   * Formats a time unit to ensure it is displayed with leading zeros when needed
   * @param {number} value - The time unit value to format
   * @returns {string} Formatted time unit as a string
   * @private
   */
  _formatTimeUnit(value) {
    return value < 10 ? `0${value}` : `${value}`;
  }

  /**
   * Starts the countdown timer
   */
  start() {
    // Initial update
    this._updateCountdown();

    // Set interval to update countdown every second
    this.intervalId = setInterval(() => {
      this._updateCountdown();
    }, 1000);
  }

  /**
   * Stops the countdown timer
   */
  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// When the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Dynamically instantiate countdown components
  const template = document.getElementById("countdown-component-template");
  document
    .querySelectorAll(".countdown-component[data-title][data-date]")
    .forEach((container, idx) => {
      const clone = template.content.cloneNode(true);
      const title = container.getAttribute("data-title");
      const dateStr = container.getAttribute("data-date");
      clone.querySelector(".countdown-title").textContent = title;
      // Assign unique IDs for each segment
      ["days", "hours", "minutes", "seconds"].forEach((unit) => {
        clone.querySelector("." + unit).id = unit + "-" + idx;
      });
      // Remove .countdown-component class from container to avoid nesting
      container.classList.remove("countdown-component");
      // Append only the inner countdown-container
      container.appendChild(clone.querySelector('.countdown-container'));
      // Setup CountdownTimer
      const elements = {
        days: document.getElementById("days-" + idx),
        hours: document.getElementById("hours-" + idx),
        minutes: document.getElementById("minutes-" + idx),
        seconds: document.getElementById("seconds-" + idx),
      };
      const targetDate = new Date(dateStr);
      const timer = new CountdownTimer(targetDate, elements);
      timer.start();
    });
  /**
   * The target date for the shutdown timer (June 19, 2026)
   * @type {Date}
   */

});
