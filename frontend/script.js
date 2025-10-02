// Show error message below input
function showError(inputId, message) {
  const errorElement = document.getElementById(inputId + "-error");
  if (errorElement) {
    errorElement.innerText = message;
  }
}

// Clear error message
function clearError(inputId) {
  const errorElement = document.getElementById(inputId + "-error");
  if (errorElement) {
    errorElement.innerText = "";
  }
}

// Save user data (Register)
function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let valid = true;

  if (!name) {
    showError("name", "Name is required");
    valid = false;
  } else {
    clearError("name");
  }

  if (!email) {
    showError("email", "Email is required");
    valid = false;
  } else {
    clearError("email");
  }

  if (!password) {
    showError("password", "Password is required");
    valid = false;
  } else if (password.length < 6) {
    showError("password", "Password must be at least 6 characters");
    valid = false;
  } else {
    clearError("password");
  }

  if (!valid) return;

  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Registration successful! Please login now.");
  window.location.href = "login.html";
}

// Login user
function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let valid = true;

  if (!email) {
    showError("email", "Email is required");
    valid = false;
  } else {
    clearError("email");
  }

  if (!password) {
    showError("password", "Password is required");
    valid = false;
  } else {
    clearError("password");
  }

  if (!valid) return;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    showError("email", "No user found. Please register first.");
    return;
  }

  if (storedUser.email === email && storedUser.password === password) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    showError("password", "Invalid email or password");
  }
}

// Dashboard user load
function loadDashboard() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!isLoggedIn || !user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeUser").innerText = `Welcome, ${user.name} 🎉`;
}

// Logout
function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}
