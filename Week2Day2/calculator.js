import { ExpenseStore } from "./ExpenseStore.js";

function fakeFetchExpenses(shouldFail = false) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (shouldFail) {
        reject("Server error");
        return;
      }

      const success = Math.random() < 0.7;

      if (success) {
        resolve([
          { name: "Rent", amount: 1000, category: "Bills" },
          { name: "Groceries", amount: 200, category: "Food" },
          { name: "Utilities", amount: 150, category: "Bills" }
        ]);
      } else {
        reject("Network error");
      }
    }, 1500);
  });
}

const form = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const errorText = document.getElementById("error");
const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");
const filterCategory = document.getElementById("filter-category");
const categoryTotalsList = document.getElementById("category-totals");
const loadSampleButton = document.getElementById("load-sample");
const loadingText = document.getElementById("loading");

const store = new ExpenseStore();
let editingId = null;

function startEdit(id) {
  const expense = store.getAll().find(item => item.id === id);
  nameInput.value = expense.name;
  amountInput.value = expense.amount;
  categoryInput.value = expense.category;
  editingId = expense.id;
}

function deleteExpense(id) {
  store.remove(id);
  if (editingId === id) {
    editingId = null;
    form.reset();
  }
  renderExpenses();
}

function calculateCategoryTotals() {
  return store.getAll().reduce((totals, expense) => {
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
    li.textContent = `${category}: ${categoryTotals[category].toFixed(2)}`;
    categoryTotalsList.appendChild(li);
  }
}

function renderExpenses() {
  expenseList.innerHTML = "";

  const expenses = store.getAll();
  const selectedCategory = filterCategory.value;
  let visibleExpenses = expenses;

  if (selectedCategory !== "All") {
    visibleExpenses = expenses.filter(expense => expense.category === selectedCategory);
  }

  for (const expense of visibleExpenses) {
    const li = document.createElement("li");
    li.textContent = `${expense.name} - ${expense.category} - Rs. ${expense.amount.toFixed(2)}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteExpense(expense.id);
    });
    li.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      startEdit(expense.id);
    });
    li.appendChild(editButton);

    expenseList.appendChild(li);
  }

  totalElement.textContent = store.getTotal().toFixed(2);
  renderCategoryTotals();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  if (!name || !category || isNaN(amount) || amount <= 0) {
    errorText.textContent = "Please fill in all fields.";
    return;
  }

  if (editingId === null) {
    store.add(name, amount, category);
  } else {
    store.update(editingId, { name, amount, category });
    editingId = null;
  }

  renderExpenses();
  form.reset();
  errorText.textContent = "";
});

loadSampleButton.addEventListener("click", function () {
  loadingText.textContent = "Loading...";
  errorText.textContent = "";
  loadSampleButton.disabled = true;

  fakeFetchExpenses()
    .then(function (data) {
      const existing = store.getAll();
      data
        .filter(item => !existing.some(expense => expense.name === item.name))
        .forEach(item => store.add(item.name, item.amount, item.category));
      renderExpenses();
    })
    .catch(function (error) {
      errorText.textContent = `Error: ${error}`;
    })
    .finally(function () {
      loadingText.textContent = "";
      loadSampleButton.disabled = false;
    });
});

filterCategory.addEventListener("change", function () {
  renderExpenses();
});

renderExpenses();