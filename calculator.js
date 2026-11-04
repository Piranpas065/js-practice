const form = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");
const categoryInput = document.getElementById("category");
const errorText = document.getElementById("error");

let expenses = [];

function calculateTotal() {
    let total = 0;
    for (const expense of expenses){
        total += expense.amount;
    }
     return total;
}


function renderExpenses() {
  expenseList.innerHTML = "";

  for (const expense of expenses) {
    const li = document.createElement("li");

    li.textContent = `${expense.name} - ${expense.category} - Rs. ${expense.amount.toFixed(2)}`;
    expenseList.appendChild(li);
  }
  totalElement.textContent = calculateTotal();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value).toFixed(2);
    const category = categoryInput.value;

    if(!name || isNaN(amount) || amount <= 0 || !category) {
        errorText.textContent = "Please fill all required feilds with valid values.";
        return;
    }
    expenses.push({ name, amount: parseFloat(amount), category });
    renderExpenses();
    form.reset();
    errorText.textContent = "";

});