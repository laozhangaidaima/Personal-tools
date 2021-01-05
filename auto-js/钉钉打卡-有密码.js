"auto";

let unlockCode = [
  850,
  1600, //9
  840,
  1400, //6
  250,
  1200, //1
  540,
  1780, //0
];
function 九() {
  click(unlockCode[0], unlockCode[1]);
}
function 六() {
  click(unlockCode[2], unlockCode[3]);
}
function 一() {
  click(unlockCode[4], unlockCode[5]);
}
function 零() {
  click(unlockCode[6], unlockCode[7]);
}
// 息屏则先解锁
if (!device.isScreenOn()) {
  device.wakeUp();
  sleep(1000);
  //下拉状态栏
  swipe(255, 255, 255, 1000, 1000);
  sleep(400);
  //点击时间
  click(255, 255);
  sleep(1000);
  九();
  sleep(400);
  六();
  sleep(400);
  一();
  sleep(400);
  零();
  sleep(400);
  一();
  sleep(400);
  一();
  sleep(1000);
  app.launchApp("钉钉");
} else {
  // 直接运行
  app.launchApp("钉钉");
}
