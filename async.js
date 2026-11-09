function getExpenses() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const success = true;
      if(success) {
        resolve ([{name: "Rent", amount: 1000}, 
                 {name: "Groceries", amount: 200}, 
                 {name: "Utilities", amount: 150}]);
      }else {
        reject("Data load ahalla");
      }
    }, 1000);
  });
}

console.log("Loading...");

getExpenses()
  .then(function (expenses) {
    expenses.forEach(function(expense) {
      console.log(`${expense.name}: ${expense.amount}`);
    });
  })
  .catch(function (error) {
    console.log("Error:", error);
  })
  .finally(function () {
    console.log("Done");
  });