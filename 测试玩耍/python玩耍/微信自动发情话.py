from __future__ import unicode_literals
import time
from wxpy import *
import requests
import re
qhdqs = []  # 建一个空列表装网上的情话
for i in range(1000, 1005):  # 发送的条数
    print("i", i)
    try:
        url = "http://www.ainicr.cn/qh/" + str(i) + ".html"
        print("url", url)

        # 找到一个情话网站，网站规律很简单，从1000开始，每页大概10句，2000页的话是20000句情话
        # 应该够听了吧
        response = requests.get(url).text  # 用requests.get（）函数访问页面并获得信息
        counts = re.findall('<p>(.*?)</p></a>', response)
        # 用正则表达式提取信息
        # 网站程序员估计忙着谈恋爱去了，太容易抓取和清洗了
        # 不过也许是为了帮助广大程序员爬取情话爱哄女朋友
        for count in counts:  # 依次获取情话
            qhdqs.append(count)  # 把情话添加到情话大全中
    except:
        print("错误")

        pass  # 出错的话就跳过，两万句情话，少个百十条不重要


bot = Bot()  # 开始进行网页微信登陆
try:
    # 你女朋友的微信名称，不是备注，也不是微信帐号。 通过网页版微信复制粘贴
    my_friend = bot.friends().search(u'嘿你认真点🙄')[0]
    for qh in qhdqs:  # 从情话大全中提取情话
        my_friend.send(qh)  # 给女朋友发情话
        time.sleep(3)  # 休息3秒钟让女朋友有时间看一下，要不然不就白做了
except:
    my_friend = bot.friends().search('情绪')[0]  # 你的微信名称，不是微信帐号。
    my_friend.send(u"消息发送失败了")  # 告诉自己消息发送失败，百十条失败的话不用处理，反正情话多
