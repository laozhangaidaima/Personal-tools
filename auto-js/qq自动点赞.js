auto.waitFor();
launchApp("QQ");
id("ba1").findOne().click();
id("f9u").findOne().click();
id("l0b").findOne().click();
for (var x = 1; x < 4; x++) {
  for (var a = 1; a < 7; a++) {
    for (var i = 0; i < 10; i++) {
      desc("赞").click();
    }
    id("kzn").findOne().scrollForward();
  }
  bounds(0, 1236, 720, 1356).findOne().click();
}
id("ivTitleBtnLeft").findOne().click();
sleep(500);
id("ivTitleBtnLeft").findOne().click();
id("a4a").findOne().click();
exit();
