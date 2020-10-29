auto.waitFor();//检查无障碍服务是否已经启用
var height = device.height;//设定高度值=设备高度
var width = device.width;//设定宽度值=设备宽度
setScreenMetrics(width, height);//设置脚本坐标点击所适合的屏幕宽高。如果脚本运行时，屏幕宽度不一致会自动放缩坐标。  
 
toast("请在 淘金币 主界面  运行脚本")
sleep(2000);
click(107,1480);
toast("开始逛店铺任务")
sleep(3000);
while(desc("逛10秒+10").exists()){
    var 逛店铺=desc("逛10秒+10").findOne().bounds();
    //从注释里找到文本，然后取坐标
    var x=逛店铺.centerX();
    var y=逛店铺.centerY();
    if(y>height){
        swipe(width / 2, height - 600, width / 2, 0, 1000);
        //如果不在本页，下滑
    }
    else{
    click(x,y);
    sleep(8000);
    var 关注=text("关注+10").findOne().bounds();
    var a=关注.centerX();
    var b=关注.centerY();
    click(a,b);
    sleep(6000);
    back();
    sleep(2000);
    }
}
toast("逛店铺任务结束")
sleep(2000);
back();
sleep(2000);
 
//以下为能量任务，可根据情况手动干预
能量任务();
//如果不想用这个，可以屏蔽掉上面代码即可
//此功能不太完善
function 能量任务(){
 
 
    if (text("赚金币").exists()) {
        text("赚金币").findOne().click();
    }
    toast("开始做任务赚金币")
    sleep(2000);
 
    while(desc("领取奖励").exists()){
        var 领取奖励=text("领取奖励").findOne().bounds();
        var x=领取奖励.centerX();
        var y=领取奖励.centerY();
        click(x,y);
        sleep(2000);
    }
    //先把每日奖励领了
    sleep(2000);
 
 
    for(var i=0;i<3;i++){
    //三次之后，会卡到充值那里，只能跳过哦
        if (text("领取奖励").exists()) {
            text("领取奖励").findOne().click();
            sleep(2000)
        }
        var 去完成=text("去完成").findOne().bounds();
        var x=去完成.centerX();
        var y=去完成.centerY();
        click(x,y);
        sleep(5000);
        swipe(width / 2, height - 600, width / 2, 0, 1000);
        sleep(17000);
        click(307,2285);
        //返回按钮位置，有时候back返回不了
        sleep(2000)
    }
 
    for(var i=0;i<30;i++){
        //循环30次，根据自己情况修改
        if (text("领取奖励").exists()) {
            text("领取奖励").findOne().click();
            sleep(2000)
        }
        click(911,1940);
        //根据自己手机坐标，跳过不能自动返回的任务
        sleep(5000);
        swipe(width / 2, height - 600, width / 2, 0, 1000);
        sleep(17000);
        click(307,2285);
        sleep(2000)
    }
}