//双线程执行2次，采用AUTOJS软件自带定时功能定时触发，钉钉5.1.12 1920*1080分辨适用，20200821更新
for (i = 0; i < 2; i++) {
    threads.start(function() { //线程1--主程序
        do_main();
    });
    sleep(180 * 1000); //线程2--防死循环时间 180秒
    threads.shutDownAll();
     sleep(500);
    log("防死循环时间到，结束全部进程");
}

//主程序
function do_main() {
    var now_time = new Date();
    var now_hours = now_time.getHours()
    auto.waitFor("fast"); //检查无障碍权限启动
    bright_screen();
    sleep(500);
    //unlock_screen();//只支持安卓>=7.0  选择性使用
    sleep(500);
    is_login();
    sleep(500);
    in_kaoqin();
    sleep(500);
    if (now_hours <= 12) { //小于等于12点进入上班打卡   
        do_clock_in();
        sleep(500);
    } else {
        do_clock_out()
        sleep(500);
    }
    device.cancelKeepingAwake();
    log("主程序执行完毕，取消设备常亮");
}

//子程序：
//1.亮屏//    bright_screen()
//2.解锁//unlock_screen()
//3.结束钉钉//stop_app()
//4.是否登录//is_login()
//5.进入考勤页面//in_kaoqin()
//6.上班打卡//do_clock_in()
//7.下班打卡//do_clock_out()


//1.亮屏
function bright_screen() {
    log("进入亮屏子程序")
    device.wakeUpIfNeeded(); //唤醒设备
    device.keepScreenOn(); //保持亮屏
    log("已唤醒");
    if (!device.isScreenOn()) {
        log("未唤醒");
        device.wakeUpIfNeeded();
        bright_screen();
    }
}

//2.解锁--安卓7.0及以上才能支持手势及坐标操作
function unlock_screen() {
    log("进入解锁子程序");
    swipe(X1, Y1, X2, Y2, 1000); //上划调出手势界面
    sleep(1000);
    gesture(1000, [X1, Y1], [X2, Y2], [X2 ,Y3]); //手势解锁
    sleep(1000);
    home();
    sleep(500);
}

//3.结束钉钉进程，一般不使用
function stop_app() {
    log("进入结束钉钉进程子程序");
    app.openAppSetting("com.alibaba.android.rimet"); //进入钉钉设置
    text(app.getAppName("com.alibaba.android.rimet")).waitFor();
    let is_sure = textMatches(/(强制.*|.*停止|强行.*|结束.*)/).clickable(true).findOne();
    if (is_sure.enabled()) {
        sleep(1000);
        textMatches(/(强制.*|.*停止|.*确定.*|结束.*)/).clickable(true).findOne().click();
        sleep(1000);
        textMatches(/(强制.*|.*停止|.*确定.*)/).clickable(true).findOne().click();
        log(app.getAppName("com.alibaba.android.rimet") + "应用已被关闭");
        sleep(500);
        home();
    } else {
        log(app.getAppName("com.alibaba.android.rimet") + "应用不能被正常关闭,重试");
        sleep(500);
        home();
    }
}

//4.判断是否未登录   部分需要手动修改代码
function is_login() {
    log("进入登录判定子程序");
    app.launchPackage("com.alibaba.android.rimet");
    sleep(8000);//时间视手机反应速度调整
    back();
    sleep(1000);
    back();    //确保启动钉钉后进入主页面
   sleep(4000);   
   app.launchPackage("com.alibaba.android.rimet");
   sleep(8000);//时间视手机反应速度调整
    if (id("et_pwd_login").exists()) { //判定是否在登录页面
        var 手机号码 = id("et_phone_input").findOne();
        手机号码.setText("请输入登录名"); //请----------输----------入----------------------登录名
        var 密码 = id("et_pwd_login").findOne();
        sleep(1000);
        密码.setText("请输入登录密码"); //请----------输----------入-----------------------登录密码
        id("btn_next").findOne().click();
        sleep(7000);
        info = "账号未登录>>已登录成功"
        log(info)
    } else {
        if (className("android.widget.RelativeLayout").exists()) {
            log("账号已登录")
            sleep(500);
        } else {
            log("未检测到钉钉活动页面>>重启钉钉")
            is_login();
        }
    }
}
//5.进入考勤页面
function in_kaoqin() {
    log("进入考勤页面切换子程序")
    if (null != textMatches("工作台").clickable(true).findOne(3000)) {
        toast("text中找到工作台按钮")
        anniu_gongzou = textMatches(/(.*工作台.*)/).findOnce()
        log("text中找到工作台按钮")
        sleep(500);
        anniu_gongzou.click();
        sleep(6000);
        if (null != textMatches("考勤打卡").clickable(true).findOne(3000)) {
            toast("text中找到考勤打卡按钮")
            anniu_kaoqin = textMatches(/(.*考勤打卡.*)/).findOne()
            log("text中找到考勤按钮")
            sleep(500)
            anniu_kaoqin.click();
            sleep(7000);
            log("进入打卡页面");
        } else {
            if (null != descMatches("考勤打卡").clickable(true).findOne(3000)) {
                toast("desc中找到考勤打卡按钮")
                anniu_kaoqin = descMatches(/(.*考勤打卡.*)/).findOne()
                log("desc中找到考勤按钮")
                sleep(500)
                anniu_kaoqin.click();
                sleep(7000);
                log("进入打卡页面");
            } else {
                sleep(500)
                log("未进入打卡页面");
                sleep(2000);
                in_kaoqin();
            }
        }
    }
    if (null != descMatches("工作台").clickable(true).findOne(3000)) {
        toast("desc中找到工作台按钮")
        anniu_gongzou = descMatches(/(.*工作台.*)/).findOnce()
        log("desc中找到工作台按钮")
        sleep(500);
        anniu_gongzou.click();
        sleep(6000);
        if (null != textMatches("考勤打卡").clickable(true).findOne(3000)) {
            toast("text中找到考勤打卡按钮")
            anniu_kaoqin = textMatches(/(.*考勤打卡.*)/).findOne()
            log("text中找到考勤按钮")
            sleep(500)
            anniu_kaoqin.click();
            sleep(7000);
            log("进入打卡页面");
        } else {
            if (null != descMatches("考勤打卡").clickable(true).findOne(3000)) {
                toast("desc中找到考勤打卡按钮")
                anniu_kaoqin = descMatches(/(.*考勤打卡.*)/).findOne()
                log("desc中找到考勤按钮")
                sleep(500)
                anniu_kaoqin.click();
                sleep(7000);
                log("进入打卡页面");
            } else {
                sleep(500)
                log("未进入打卡页面");
                sleep(2000);
                in_kaoqin();
            }
        }
    }
}

//6.上班打卡
function do_clock_in() {
    log("进入上班打卡子程序")
    if (anniu_click_in = textMatches(/(.*上班打.*|上班打.*)/).findOnce()) {
        log("可以打上班卡");
        sleep(1000);
        //textContains("已进入考勤范围").waitFor();
        var randomtime = random(6, 50);
        log(randomtime + "秒后执行");
        toast(randomtime + "秒后执行");
        sleep(randomtime * 1000);
         //下列7行代码请按安卓版本选择使用-------------------------------------------
        click(540,1110)//安卓7.0及以上使用  
        bounds(342, 921, 738, 1314).click();  //安卓<7.0使用
        sleep(100)
        bounds(342, 975, 738, 1368).click();  //安卓<7.0使用
        sleep(100)
        bounds(342, 870, 738, 1263).click()  //安卓<7.0使用
        sleep(3000);
        text("上班打卡成功").findOne().click();;
        sleep(2000);
        log("按下打卡按钮，打卡成功");
    } else {
        log("未找到打卡上班按钮>>继续找");
        sleep(500);
        let daka_ok = textMatches(/(.*下班打.*|下班打.*)/).findOnce()
        if (daka_ok != null) {
            log("已出现下班打卡按钮，无需再按")
            toast("已打卡")
            sleep(1000);
            home();
        } else {
            log("未打卡，重试");
            sleep(3000);
            toast("未打卡，重试")
           sleep(3000);
            do_clock_in();
        }
    }
    home();
    sleep(1000);
    log("脚本已执行完毕");
}

//7.下班打卡hecked
function do_clock_out() {
    log("进入下班打卡子程序");
    let daka_ok = textMatches(/(.*新打卡.*|更新打.*)/).findOnce()
    if (daka_ok != null) {
        log("已出现更新打卡按钮，无需再按")
        toast("已打卡")
        sleep(1000);
        home();
    } else {
        if (anniu_click_out = textMatches(/(.*下班打.*|下班打.*)/).findOnce()) {
            log("可以打下班卡");
            sleep(2000);
            //textContains("已进入考勤范围").waitFor();
            var randomtime = random(6, 20);
            log(randomtime + "秒后执行");
            toast(randomtime + "秒后执行");
            sleep(randomtime * 1000);
            //下列7行代码请按安卓版本选择使用-------------------------------------------
            click(540,1110)//安卓7.0及以上使用  
            bounds(342, 921, 738, 1314).click();  //安卓<7.0使用
            sleep(100)
            bounds(342, 975, 738, 1368).click();  //安卓<7.0使用
            sleep(100)
            bounds(342, 870, 738, 1263).click()  //安卓<7.0使用
            sleep(3000);
            text("下班打卡成功").findOne().click();
            sleep(2000);
            log("按下打卡按钮，打卡成功");
        } else {
            log("未打卡，重试");
            sleep(3000);
            toast("未打卡，重试")
            sleep(3000);
            do_clock_out();
        }
    }
    home();
    sleep(1000);
    log("脚本已执行完毕");
}
