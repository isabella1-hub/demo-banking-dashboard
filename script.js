// =====================
// Demo Banking Dashboard (Multi-User with localStorage)
// =====================

// Users data
let users = [
  { id: 1, name: "Kim Castro", email: "kim@example.com", password: "1234", balance: 880315, accountNumber: "111111", bankName: "Bank A" },
  { id: 2, name: "John Doe", email: "john@example.com", password: "abcd", balance: 50000, accountNumber: "222222", bankName: "Bank B" },
  { id: 3, name: "Mary Jane", email: "mary@example.com", password: "pass", balance: 75000, accountNumber: "333333", bankName: "Bank C" },
];

// Get active user from localStorage
let activeUser = JSON.parse(localStorage.getItem("user"));

// Redirect to login if no user found
if (!activeUser) {
  window.location.href = "login.html";
}

// Format balance
function formatBalance(amount) {
  return "$" + amount.toLocaleString();
}

// Update balance display immediately
document.addEventListener("DOMContentLoaded", () => {
  const balanceElement = document.querySelector(".balance");
  balanceElement.textContent = "$" + activeUser.balance.toLocaleString();

  // === Top-up ===
  document.querySelector(".topup").addEventListener("click", () => {
    let amount = Number(prompt("Enter top-up amount:"));
    if (amount > 0) {
      activeUser.balance += amount;
      localStorage.setItem("user", JSON.stringify(activeUser));
      balanceElement.textContent = "$" + activeUser.balance.toLocaleString();
      alert(`Top-up successful! New balance: ${formatBalance(activeUser.balance)}`);
    } else alert("Invalid amount");
  });

  // === Receive money ===
  document.querySelector(".receive").addEventListener("click", () => {
    let amount = Number(prompt("Enter amount to receive:"));
    if (amount > 0) {
      activeUser.balance += amount;
      localStorage.setItem("user", JSON.stringify(activeUser));
      balanceElement.textContent = "$" + activeUser.balance.toLocaleString();
      alert(`Receive successful! New balance: ${formatBalance(activeUser.balance)}`);
    } else alert("Invalid amount");
  });

  // More options
  document.querySelector(".more").addEventListener("click", () => {
    alert("More options coming soon...");
  });
});

// === Send Money via Form ===
function sendMoney() {
  let accountNumber = document.getElementById("accountNumber").value;
  let bankName = document.getElementById("bankName").value;
  let amount = Number(document.getElementById("amount").value);

  if (!accountNumber || !bankName || amount <= 0) {
    return alert("Fill all fields correctly");
  }

  if (amount > activeUser.balance) {
    return alert("Insufficient funds");
  }

  activeUser.balance -= amount;

  // Save updated user
  localStorage.setItem("user", JSON.stringify(activeUser));

  document.querySelector(".balance").textContent =
    "$" + activeUser.balance.toLocaleString();

  alert(
    `Transfer Successful!\n\nAcct: ${accountNumber}\nBank: ${bankName}\nAmount: $${amount}\nRef: TXN${Math.floor(Math.random()*1000000)}`
  );
}
