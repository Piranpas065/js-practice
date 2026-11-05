const form = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const errorText = document.getElementById("error");
const expenseList = document.getElementById("expense-list");    
const totalElement = document.getElementById("total");
const filterCategory = document.getElementById("filter-category");
const categoryTotalsList = document.getElementById("category-totals");

const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editingId = null;

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function calculateTotal(){
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

function startEdit(id){
    const expense = expenses.find(item => item.id === id);
    nameInput.value = expense.name;
    amountInput.value = expense.amount;
    categoryInput.value = expense.category;
    editingId = expense.id;
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    if (editingId === id) {
        editingId = null;
        form.reset();
    }
    saveExpenses();
    renderExpenses();
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
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteExpenses(expense.id);
            saveExpenses();
            renderExpenses();
        });
        expenseList.appendChild(li);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";    
        editButton.addEventListener("click", function () {
            startEdit(expense.id);
            saveExpenses();
        });
        expenseList.appendChild(li);
    
    }
    totalElement.textContent = calaculateTotal();
    saveExpenses();
    renderCategoryTotals();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (!name || isNaN(amount) || amount <= 0 || !category) {
        errorText.textContent = "Please fill in all fields with valid values.";
        return;
    }

    if (editingId === null) {
        const expense = { id: Date.now(), name, amount: parseFloat(amount), category };
        expenses.push(expense);
    } else {
        expenses = expenses.map(expense =>
            expense.id === editingId
                ? { ...expense, name, amount: parseFloat(amount), category }
                : expense
        );
        editingId = null;
    }

    errorText.textContent = "";

    const newExpense = {
        id: Date.now(),
        name,
        amount,
        category
    };

    expenses.push(newExpense);
    saveExpenses();
    renderExpenses();
    errorText.textContent = "";
    form.reset();
});

filterCategory.addEventListener("change", function () {
    renderExpenses();
    saveExpenses();
});

function calculateCategoryTotals() {
    expenses.reduce((totals, expense) => {
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

renderExpenses();