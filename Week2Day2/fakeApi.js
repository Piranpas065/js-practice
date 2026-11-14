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
          { id: 1, name: "Rent", amount: 1000, category: "Housing" },
          { id: 2, name: "Groceries", amount: 200, category: "Food" },
          { id: 3, name: "Utilities", amount: 150, category: "Housing" }
        ]);
      } else {
        reject("Network error");
      }
    }, 1500);
  });
}

console.log("Loading...");

fakeFetchExpenses()
  .then(function (expenses) {
    console.log("Received:", expenses.length);
  })
  .catch(function (error) {
    console.log("Error:", error);
  })
  .finally(function () {
    console.log("Done");
  });