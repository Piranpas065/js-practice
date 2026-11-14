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
          { id: 1, name: "Rent", amount: 1000, category: "Bills" },
          { id: 2, name: "Groceries", amount: 200, category: "Food" },
          { id: 3, name: "Utilities", amount: 150, category: "Bills" }
        ]);
      } else {
        reject("Network error");
      }
    }, 1500);
  });
}

async function loadExpenses() {
  console.log("Loading...");

  try {
    const data = await fakeFetchExpenses();
    console.log(data.length);
  } catch (error) {
    console.log(error);
} finally {
    console.log("Done");
  }
}

loadExpenses();