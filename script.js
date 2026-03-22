// =====================
// Demo Banking Dashboard (Multi-User)
// =====================

// Users data
let users = [
  { id: 1, name: "Kim Castro", email: "kim@example.com", password: "1234", balance: 880315 },
  { id: 2, name: "John Doe", email: "john@example.com", password: "abcd", balance: 50000 },
  { id: 3, name: "Mary Jane", email: "mary@example.com", password: "pass", balance: 75000 },
];

let activeUser = null;

// Format balance
function formatBalance(amount) {
  return "$" + amount.toLocaleString();
}

// Login function
function login() {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    activeUser = user;
    alert(`Welcome ${user.name}!`);
    document.querySelector(".balance").textContent = formatBalance(activeUser.balance);
  } else {
    alert("Invalid email or password. Try again.");
    login(); // Retry login
  }
}

// Run after page loads
document.addEventListener("DOMContentLoaded", () => {
  
  // Trigger login first
  login();

  const balanceElement = document.querySelector(".balance");

  // === Top-up ===
  document.querySelector(".topup").addEventListener("click", () => {
    let amount = Number(prompt("Enter top-up amount:"));
    if (amount > 0) {
      activeUser.balance += amount;
      balanceElement.textContent = formatBalance(activeUser.balance);
      alert(`Top-up successful! New balance: ${formatBalance(activeUser.balance)}`);
    } else alert("Invalid amount");
  });

  // === Send money ===
  document.querySelector(".send").addEventListener("click", () => {
    let receiverEmail = prompt("Enter recipient email:");
    let amount = Number(prompt("Enter amount to send:"));

    const receiver = users.find(u => u.email === receiverEmail);
    if (!receiver) return alert("Recipient not found");
    if (amount > activeUser.balance) return alert("Insufficient funds");

    activeUser.balance -= amount;
    receiver.balance += amount;
    balanceElement.textContent = formatBalance(activeUser.balance);

    alert(
      `Demo Transfer Successful!\nFrom: ${activeUser.name}\nTo: ${receiver.name}\nAmount: ${formatBalance(amount)}\nReference: TXN${Math.floor(Math.random()*1000000)}`
    );
  });

  // === Receive money (manual top-up simulation) ===
  document.querySelector(".receive").addEventListener("click", () => {
    let amount = Number(prompt("Enter amount to receive:"));
    if (amount > 0) {
      activeUser.balance += amount;
      balanceElement.textContent = formatBalance(activeUser.balance);
      alert(`Receive successful! New balance: ${formatBalance(activeUser.balance)}`);
    } else alert("Invalid amount");
  });

  // More options
  document.querySelector(".more").addEventListener("click", () => {
    alert("More options coming soon...");
  });

});
