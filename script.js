// =====================
// Demo Banking Dashboard
// =====================

// Fake user data
let user = {
  name: "Kim Castro",
  balance: 880315,
};

// Format balance
function formatBalance(amount) {
  return "$" + amount.toLocaleString();
}

// Run after page loads
document.addEventListener("DOMContentLoaded", () => {

  // Show balance
  const balanceElement = document.querySelector(".balance");
  if (balanceElement) {
    balanceElement.textContent = formatBalance(user.balance);
  }

  // Top Up
  document.querySelector(".topup").addEventListener("click", () => {
    let amount = Number(prompt("Enter top-up amount:"));
    if (!isNaN(amount) && amount > 0) {
      user.balance += amount;
      balanceElement.textContent = formatBalance(user.balance);
      alert(`Top-up successful! New balance: ${formatBalance(user.balance)}`);
    } else {
      alert("Invalid amount");
    }
  });

  // Send
  document.querySelector(".send").addEventListener("click", () => {
    let amount = Number(prompt("Enter amount to send:"));
    if (!isNaN(amount) && amount > 0) {
      if (amount > user.balance) {
        alert("Insufficient funds");
      } else {
        user.balance -= amount;
        balanceElement.textContent = formatBalance(user.balance);
        alert(`Transfer successful! New balance: ${formatBalance(user.balance)}`);
      }
    } else {
      alert("Invalid amount");
    }
  });

  // Receive
  document.querySelector(".receive").addEventListener("click", () => {
    let amount = Number(prompt("Enter amount to receive:"));
    if (!isNaN(amount) && amount > 0) {
      user.balance += amount;
      balanceElement.textContent = formatBalance(user.balance);
      alert(`Receive successful! New balance: ${formatBalance(user.balance)}`);
    } else {
      alert("Invalid amount");
    }
  });

  // More
  document.querySelector(".more").addEventListener("click", () => {
    alert("More options coming soon...");
  });

});
