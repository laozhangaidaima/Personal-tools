// toast("静等20秒，你会看到想看的...");

// while (true) {
//   if (timeStr == "17:54") {
//     let myDate = new Date();
//     let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
//     let timeStr = str.substring(0, 5); //  '10:55:24'
//     console.log("timeStr", timeStr);
//   }
// }

// if (timeStr=='18:00') {

// }

// toast(timeStr);

// setInterval("circulateExecute();", 10 * 60 * 1000); //10分钟执行一次
// circulateExecute();
// function circulateExecute() {
//   let myDate = new Date();
//   let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
//   let timeStr = str.substring(0, 5); //  '10:55:24'
//   console.log("timeStr", timeStr);

//   if (timeStr == "18:03") {
//     launchApp("钉钉");
//   }
// }

circulateExecute();
function circulateExecute() {
  launchApp("钉钉");
}
