const items = [
  { name: "Tea", amount: 20, category: "Food" },
  { name: "Bus", amount: 30, category: "Travel" },
  { name: "Lunch", amount: 100, category: "Food" }
];

// Q1: map vachu ellaa amounts-um edunga
const amounts = items.map(item => item.amount); 
console.log(amounts); // [20, 30, 100]

// Q2: filter vachu amount 25-ku mela irukkura items edunga
const bigItems = items.filter(item => item.amount > 25).map(item => item.name); 
console.log(bigItems); // Bus, Lunch

// Q3: Food items-oda total kandupidinga
const foodTotal = items.filter(item => item.category === "Food").reduce((total,item) => total + item.amount, 0); // inga maathunga
console.log(foodTotal); // 120