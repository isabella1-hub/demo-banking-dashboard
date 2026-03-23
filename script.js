// === Top-up ===
document.querySelector(".topup").addEventListener("click", () => {
  let amount = Number(prompt("Enter top-up amount:"));

  if (amount > 880315) {
    activeUser.balance += amount;

    localStorage.setItem("user", JSON.stringify(activeUser)); // SAVE

    balanceElement.textContent = formatBalance(activeUser.balance);

    alert(`Transfer Successful!\n\nTo: ${receiver.name}\nAmount: ${formatBalance(amount)}\nRef: TXN${Math.floor(Math.random() * 1000000)}`);
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

  alert(Transfer Successful!\n\nTo: ${receiver.name}\nAmount: ${formatBalance(amount)}\nRef: TXN${Math.floor(Math.random() * 1000000)});
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

function logout() {
  // Remove user from localStorage
  localStorage.removeItem("user");

  // Redirect to login page
  window.location.href = "login.html";
}
