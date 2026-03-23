// =====================
// Check Login
// =====================
let activeUser = JSON.parse(localStorage.getItem("user"));

if (!activeUser) {
  window.location.href = "login.html";
}

// =====================
// Users Data (for transfers)
// =====================
let users = [
  { id: 1, name: "Kim Castro", email: "kim@example.com", balance: 880315, accountNumber: "111111", bankName: "Bank A" },
  { id: 2, name: "John Doe", email: "john@example.com", balance: 50000, accountNumber: "222222", bankName: "Bank B" },
  { id: 3, name: "Mary Jane", email: "mary@example.com", balance: 75000, accountNumber: "333333", bankName: "Bank C" },
];

// =====================
// Format Balance
// =====================
function formatBalance(amount) {
  return "$" + amount.toLocaleString();
}

// =====================
// Run After Page Loads
// =====================
document.addEventListener("DOMContentLoaded", () => {

  const balanceElement = document.querySelector(".balance");

  // Show current balance
  balanceElement.textContent = formatBalance(activeUser.balance);

  // === Top-up ===
  document.querySelector(".topup").addEventListener("click", () => {
    let amount = Number(prompt("Enter top-up amount:"));

    if (amount > 0) {
      activeUser.balance += amount;

      localStorage.setItem("user", JSON.stringify(activeUser)); // SAVE

      balanceElement.textContent = formatBalance(activeUser.balance);

      alert(Top-up successful! New balance: ${formatBalance(activeUser.balance)});
    } else {
      alert("Invalid amount");
    }
  });

  // === Send Money ===
  document.querySelector(".send").addEventListener("click", () => {

    const accountNumber = prompt("Enter recipient account number:");
    const bankName = prompt("Enter bank name:");
    const amount = Number(prompt("Enter amount to send:"));

    if (!accountNumber || !bankName || amount <= 0) {
      return alert("Invalid input");
    }

    if (amount > activeUser.balance) {
      return alert("Insufficient funds");
    }

    const receiver = users.find(
      u => u.accountNumber === accountNumber && u.bankName === bankName
    );

    if (!receiver) {
      return alert("Account not found");
    }

    // Transfer
    activeUser.balance -= amount;
    receiver.balance += amount;

    localStorage.setItem("user", JSON.stringify(activeUser)); // SAVE

    balanceElement.textContent = formatBalance(activeUser.balance);

    alert(
      Transfer Successful!\n\nTo: ${receiver.name}\nAmount: ${formatBalance(amount)}\nRef: TXN${Math.floor(Math.random() * 1000000)}
    );
  });

  // === Receive ===
  document.querySelector(".receive").addEventListener("click", () => {
    let amount = Number(prompt("Enter amount to receive:"));

    if (amount > 0) {
      activeUser.balance += amount;

      localStorage.setItem("user", JSON.stringify(activeUser)); // SAVE

      balanceElement.textContent = formatBalance(activeUser.balance);

      alert(Receive successful! New balance: ${formatBalance(activeUser.balance)});
    } else {
      alert("Invalid amount");
    }
  });

});
