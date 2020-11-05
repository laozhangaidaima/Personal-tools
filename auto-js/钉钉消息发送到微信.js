// 打开钉钉 页面保持在主页
// 打开微信 页面一直保持在你要发送消息的联系人
// 定时任务 自定义打卡时间
// 不设置锁屏密码 开发者模式 直接进入系统

"auto";
// 息屏则先解锁
if (!device.isScreenOn()) {
  device.wakeUp();
  sleep(1000);
  app.launchApp("钉钉");
} else {
  // 直接运行
  app.launchApp("钉钉");
}

//   进行监听
auto();
events.observeNotification();
events.onNotification(function (notification) {
  if (notification.getPackageName() == "com.alibaba.android.rimet") {
    let msg = notification.getText();
    // 有打卡成功字段
    if (msg.indexOf("打卡成功") != -1) {
      msg = "大爷辛苦了：" + msg;
      sendMsg(msg, false);
    } else {
      sendMsg(msg, true);
    }
  }
});

// 发送消息
function sendMsg(msg, status) {
  console.log("status", status);
  app.launchApp("微信");
  sleep(1000);
  id("al_").findOne().setText(msg);
  sleep(1000);
  id("anv").findOne().click();
  sleep(1000);
  // 得到打开成功则关闭脚本
  if (!status) {
    exit();
  }
}
