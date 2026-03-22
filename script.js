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

  // === Send money ===
  document.querySelector(".send").addEventListener("click", () => {
    const method = prompt("Send by: 1 = Email, 2 = Account Number + Bank").trim();

    let receiver;
    let amount = Number(prompt("Enter amount to send:"));
    if (amount <= 0) return alert("Invalid amount");
    if (amount > activeUser.balance) return alert("Insufficient funds");

    if (method === "1") {
      const receiverEmail = prompt("Enter recipient email:");
      receiver = users.find(u => u.email === receiverEmail);
      if (!receiver) return alert("Recipient not found");
    } else if (method === "2") {
      const accountNumber = prompt("Enter recipient account number:");
      const bankName = prompt("Enter bank name:");
      receiver = users.find(u => u.accountNumber === accountNumber && u.bankName === bankName);
      if (!receiver) return alert("Account not found");
    } else {
      return alert("Invalid option");
    }

    // Perform transfer
    activeUser.balance -= amount;
    receiver.balance += amount;
    localStorage.setItem("user", JSON.stringify(activeUser));
    balanceElement.textContent = "$" + activeUser.balance.toLocaleString();

    alert(
      `Transfer Successful!\n\nFrom: ${activeUser.name}\nTo: ${receiver.name}\nAmount: ${formatBalance(amount)}\nReference: TXN${Math.floor(Math.random() * 1000000)}`
    );
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
