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

// var when = "22:22";

// newStr = when.split(""); // or newStr = [...str];
// newStr.splice(2, 1);
// newStr = newStr.join("");
// hour = newStr.slice(0, 2);
// minute = newStr.slice(2, 4);

// console.log(hour);
// console.log(minute);

// let obj = {};

// if (obj.lat) {
//   console.log(true);
// } else {
//   console.log(false);
// }

// let data = [
//   { task: "Wake Up", length: 1 },
//   { task: "Drink Water", length: 2 },
//   { task: "Make Bed", length: 1 },
//   { task: "Brush Teeth", length: 3 },
//   { task: "Shower", length: 15 },
//   { task: "Make Up", length: 10 },
//   { task: "Skin Care", length: 5 },
//   { task: "Read the News", length: 10 },
//   { task: "commute", length: 20 },
// ];

// var id = "Wake Up";

// for (var i = 0; i < data.length; i++) {
//   if (data[i].task == id) {
//     data.splice(i, 1);
//   }
// }

// console.log(data);

// var arr = ["GFG_1", "GeeksForGeeks", "Geeks", "Computer Science Portal"];

// console.log(arr[Math.floor(Math.random() * arr.length)]);

let state = {
  arr: [
    { task: "Wake Up", length: 0.05 },
    { task: "Wake Up", length: 0.05 },
    { task: "Wake Up", length: 0.05 },
    { task: "Drink Water", length: 0.05 },
    { task: "Make Bed", length: 1 },
    { task: "Brush Teeth", length: 3 },
    { task: "Shower", length: 15 },
    { task: "Make Up", length: 10 },
    { task: "Skin Care", length: 5 },
    { task: "Read the News", length: 10 },
    { task: "Exercise", length: 30 },
    { task: "Commute", length: 1 },
  ],
};

state.arr = Array.from(new Set(state.arr.map(JSON.stringify))).map(JSON.parse);

console.log(state.arr);
