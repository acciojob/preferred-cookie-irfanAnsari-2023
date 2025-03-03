//your JS code here. If required.
// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + "; path=/" + expires;
}

// Function to get a cookie value
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

// Function to apply user preferences from cookies
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    document.documentElement.style.setProperty("--fontsize", savedFontSize + "px");
    document.getElementById("fontsize").value = savedFontSize;
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    document.getElementById("fontcolor").value = savedFontColor;
  }
}

// Function to save user preferences when "Save" is clicked
function savePreferences(event) {
  event.preventDefault(); // Prevent form submission
  
  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Save values in cookies
  setCookie("fontsize", fontSize, 30); // Store for 30 days
  setCookie("fontcolor", fontColor, 30);

  // Apply preferences immediately
  applyPreferences();
}

// Attach event listener to the form
document.querySelector("form").addEventListener("submit", savePreferences);

// Apply saved preferences on page load
applyPreferences();
