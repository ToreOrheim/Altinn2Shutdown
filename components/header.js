/**
 * Loads and returns the header component HTML
 * @returns {Promise<string>} Promise resolving to HTML string for the header component
 */
async function loadHeaderComponent() {
  try {
    const response = await fetch("./components/header.html");
    if (!response.ok) {
      throw new Error(`Failed to load header component: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading header component:", error);
    return ""; // Return empty string in case of error
  }
}

// Export the component function
export { loadHeaderComponent };
