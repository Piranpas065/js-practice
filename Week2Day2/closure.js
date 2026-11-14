function createAccount(startBalance) {
  let balance = startBalance;
  let history = [];

  return {
    deposit(amount) {
      balance += amount;
      history.push(`Deposit ${amount}`);
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) {
        return "Insufficient balance";
      }
      balance -= amount;
      history.push(`withdraw ${amount}`);
      return balance;
    },
    getBalance() {
      return balance;
    },
    getMiniStatement() {
        return history;
    }
  };
}

const account = createAccount(1000);
account.deposit(500);
account.withdraw(200);
account.withdraw(1500); 
console.log(account.getBalance()); 
console.log(account.getMiniStatement()); 