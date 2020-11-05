"auto";
//   进行监听
auto();
events.observeNotification();
events.onNotification(function (notification) {
  if (notification.getPackageName() == "com.alibaba.android.rimet") {
    let msg = notification.getText();
    sendMsg(msg);
  }
  //   printNotification(notification);
});
toast("监听中，请在日志中查看记录的通知及其内容");

// 息屏则先解锁
if (!device.isScreenOn()) {
  device.wakeUp();
  sleep(1000);
  app.launchApp("钉钉");
  sleep(7000);
} else {
  // 直接运行
  app.launchApp("钉钉");
}

// 打印
function printNotification(notification) {
  log("应用包名: " + notification.getPackageName());
  log("通知文本: " + notification.getText());
  log("通知优先级: " + notification.priority);
  log("通知目录: " + notification.category);
  log("通知时间: " + new Date(notification.when));
  log("通知数: " + notification.number);
  log("通知摘要: " + notification.tickerText);
}

// 发送消息
function sendMsg(msg) {
  app.launchApp("微信");
  sleep(1000);
  id("al_").findOne().setText(msg);
  sleep(1000);
  id("anv").findOne().click();
}
