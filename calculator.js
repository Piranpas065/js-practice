const form = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const errorText = document.getElementById("error");
const expenseList = document.getElementById("expense-list");    
const totalElement = document.getElementById("total");
const filterCategory = document.getElementById("filter-category");


let expenses = [];

function calculateTotal() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

function renderExpenses() {
    expenseList.innerHTML = "";

  const selectedCategory = filterCategory.value;
  let visibleExpenses = expenses;

  if (selectedCategory !== "All") {
    visibleExpenses = expenses.filter(expense => expense.category === selectedCategory);
  }


    for (const expense of visibleExpenses) {
        const li =document.createElement("li");
        li.textContent = `${expense.name} - ${expense.amount} - ${expense.category}`;
        expenseList.appendChild(li);
    }
    totalElement.textContent = calculateTotal();
    renderCategoryTotals();
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

filterCategory.addEventListener("change", function () {
    renderExpenses();

});

function calculateCategoryTotals() {
  return expenses.reduce((totals, expense) => {
    const category = expense.category;

    if (totals[category] === undefined) {
      totals[category] = 0;
    }

    totals[category] += expense.amount;
    return totals;
  }, {});
}


function renderCategoryTotals() {
    categoryTotalsList.innerHTML = "";
    const categoryTotals = calculateCategoryTotals();

    for (const category in categoryTotals) {
        const li = document.createElement("li");
        li.textContent = `${category}: ${categoryTotals[category]}`;
        categoryTotalsList.appendChild(li);
    }
} 