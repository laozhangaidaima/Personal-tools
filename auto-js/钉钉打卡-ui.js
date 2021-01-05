"ui";
ui.layout(
  <vertical padding="16">
    <button id="autoService" text="1.点此开启无障碍服务" w="*" />
    <button id="appSet" text="2.点此开启后台控制权限" w="*" />
    <button id="appSet" text="3.选择执行时间" w="*" />

    <timepicker id="time" timePickerMode="spinner" />
    <button id="ok" text="确定" />
    <button
      id="start"
      text="开始执行"
      style="Widget.AppCompat.Button.Colored"
      w="*"
    />
  </vertical>
);

setScreenMetrics(1080, 2340);
let activeTime = "";
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



ui.autoService.on("click", () => {
  app.startActivity({
    action: "android.settings.ACCESSIBILITY_SETTINGS",
  });
});

ui.appSet.on("click", () => {
  app.startActivity({
    action: "android.settings.MANAGE_APPLICATIONS_SETTINGS",
  });
});

ui.ok.click(function () {
  //通过getText()获取输入的内容

  let activeMinute = ui.time.getCurrentMinute();
  if (String(activeMinute).length < 2) {
    activeMinute = "0" + String(activeMinute);
  }
  activeTime = ui.time.getCurrentHour() + ":" + activeMinute;

  toast("执行时间：" + activeTime);
});

ui.start.on("click", () => {
  toast("开始执行");
  var thread = threads.start(function () {
    //在子线程执行的定时器
    var timer = null; //清除定时器
    timer = setInterval(function () {
      toast("开始循环");
      let myDate = new Date();
      let str = myDate.toTimeString(); //"10:55:24 GMT+0800 (中国标准时间)"
      let timeStr = str.substring(0, 5); //  '10:55:24'
      console.log("timeStr", timeStr);
      console.log("activeTime", activeTime);
      if (activeTime == timeStr) {
        console.log("开始解锁");
        // 息屏则先解锁
        if (!device.isScreenOn()) {
          console.log("息屏解锁");
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
        clearInterval(timer);
      }
    }, 4000);
  });
});
