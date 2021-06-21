let arr = [
  ["Wake Up", 2],
  ["Drink Water", 1],
  ["Make Bed", 2],
  ["Brush Teeth", 3],
  ["Shower", 15],
  ["Make Up", 10],
  ["Skin Care", 5],
  ["commute", 20],
];

// console.log(initialState.indexOf(["Wake Up", 2]));
// console.log(arr.indexOf(5));

// arr = [[1, 2], [2], [3], [4]];

// Find Index of an item in a multidimensional array - super handy!
arr.forEach((item, index) => {
  if (item.indexOf("Brush Teeth") > -1) {
    console.log("Found item in outer array element: ", index);
  } else {
    console.log("Not found");
  }
});
