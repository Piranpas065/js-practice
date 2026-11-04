const form = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const errorText = document.getElementById("error");
const expenseList = document.getElementById("expense-list");    
const totalElement = document.getElementById("total");


let expenses = [];

function calculateTotal() {
    let total = 0;
    for (const expense of expenses) {
        total += expense.amount;
    }
    return total;
}

function renderExpenses() {
    expenseList.innerHTML = "";

    for (const expense of expenses) {
        const li =document.createElement("li");
        li.textContent = `${expense.name} - ${expense.amount} - ${expense.category}`;
        expenseList.appendChild(li);
    }
    totalElement.textContent = calculateTotal();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value).toFixed(2);
    const category = categoryInput.value;

    if (!name || !amount || !category || isNaN(amount) || amount <= 0) {
        errorText.textContent = "Please fill in all fields.";
        return;
    }

    const expense = { name ,amount: parseFloat(amount), category};

    expenses.push(expense);
    renderExpenses();
    form.reset();
    errorText.textContent = "";
});