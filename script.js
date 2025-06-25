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
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
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
      timeRemaining.minutes
    );
    this.elements.seconds.textContent = this._formatTimeUnit(
      timeRemaining.seconds
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
  /**
   * The target date for the countdown timer (May 31, 2026)
   * @type {Date}
   */
  const targetDate = new Date("2026-06-19T23:59:59");

  /**
   * DOM elements for the countdown display
   * @type {Object}
   */
  const elements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

  // Create and start the countdown timer
  const countdownTimer = new CountdownTimer(targetDate, elements);
  countdownTimer.start();
});
