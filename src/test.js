// // Find Index of an item in a multidimensional array - super handy!
// let arr = [
//   ["Wake Up", 2],
//   ["Drink Water", 1],
//   ["Make Bed", 2],
//   ["Brush Teeth", 3],
//   ["Shower", 15],
//   ["Make Up", 10],
//   ["Skin Care", 5],
//   ["commute", 20],
// ];
// arr.forEach((item, index) => {
//   if (item.indexOf("Brush Teeth") > -1) {
//     console.log("Found item in outer array element: ", index);
//   } else {
//     console.log("Not found");
//   }
// });

// const d = new Date("August 19, 1975 23:0:0");
// d.setHours(13, 30);

// console.log(d);

var when = "22:22";

newStr = when.split(""); // or newStr = [...str];
newStr.splice(2, 1);
newStr = newStr.join("");
hour = newStr.slice(0, 2);
minute = newStr.slice(2, 4);

console.log(hour);
console.log(minute);
