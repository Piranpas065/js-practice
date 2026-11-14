export class ExpenseStore {
  #expenses;

  constructor() {
    this.#expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  }

  #save() {
    localStorage.setItem("expenses", JSON.stringify(this.#expenses));
  }

  getAll() {
    return [...this.#expenses];
  }

  add(name, amount, category) {
    this.#expenses.push({id: crypto.randomUUID(), name, amount, category});
    this.#save();
  }

  remove(id) {
    this.#expenses = this.#expenses.filter(expense => expense.id !== id);
    this.#save();  
  }

  update(id, changes) {
    this.#expenses = this.#expenses.map(expense => {
        if (expense.id === id) {
            return { ...expense, ...changes, id: expense.id };
        }
        return expense;
    });
    this.#save();
  }

  getTotal() {
    return this.#expenses.reduce((total, expense) => total + expense.amount, 0);
  }
}