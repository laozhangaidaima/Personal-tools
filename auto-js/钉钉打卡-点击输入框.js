"auto";
// 息屏则先解锁
if (!device.isScreenOn()) {
  device.wakeUp();
  // 等待1-4分钟范围
  // 1秒等于1000毫秒。
  let time = parseInt(Math.random() * 3 + 1) * 60000;
  sleep(time);
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
  app.launchApp("微信");
  sleep(1000);
  click(200, 2300); //点击输入框
  sleep(1000);
  setText(msg); //设置文本
  sleep(1000);
  id("anv").findOne().click(); //点击发送按钮
  // 得到打开成功则关闭脚本
  if (!status) {
    exit();
  }
}
