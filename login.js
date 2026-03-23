let users = [
  { name: "Kim Castro", email: "kim@example.com", password: "kim@2026secure", balance: 880315 }
];

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    alert("Wrong login details");
  }

  // Optional: clear input fields after login attempt
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}
