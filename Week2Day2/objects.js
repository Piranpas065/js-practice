const expense = { name: "Bus", amount: 30, category: "Travel" };

const { name , category } = expense;
console.log(name, category); // Bus Travel

const updated = {...expense, amount : 50}; 
console.log(updated.amount, expense.amount); // 50 30

const item = {
  name: "Tea",
  amount: 20,
  describe: function() {
    return `Item: ${this.name}, Amount: ${this.amount}`;
  }
};
console.log(item.describe());

localStorage.setItem("expense", JSON.stringify({ name: "Bus", amount: 30, category: "Travel" }));
let savedExpense = JSON.parse(localStorage.getItem("expense"));
console.log(savedExpense.amount);
