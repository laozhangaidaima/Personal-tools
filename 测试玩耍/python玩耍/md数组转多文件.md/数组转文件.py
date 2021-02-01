import os
import re


# 创建文件夹 如果没有不会自动创建
def getFile(dir_name):
    if not os.path.exists(str(dir_name)):  # os模块判断并创建
        os.mkdir(dir_name)
    return dir_name

# 转换为md独立文件


def getMd():
    rstr = r"[\/\\\:\*\?\"\<\>\|\\\n\#\s]"  # '/ \ : * ? " < > |'  去除不合法文件名

    num = 1
    for md_name in http:
        md_name = re.sub(rstr, "_", md_name)  # 替换为下划线
        with open(dir_name+'/' + str(num)+'.' + md_name+'.md', 'a', encoding='UTF-8') as f:
            num += 1
            print('md_name')


if __name__ == "__main__":
    # 改变vue数组 和 文件名即可
    dir_name = 'http'  # 文件名

    http = [
        "HTTP 协议",
        "HTTP/2 协议",
        "HTTPS 协议",
        "DNS 协议",
        "HTTP的⼏种请求⽅法⽤途",
        "HTTP状态码及其含义",
        "HTTP request报⽂结构是怎样的",
        "HTTP response报⽂结构是怎样的",
        "Ajax原理",
        "ajax 有那些优缺点?",
        "谈一下 WebSocket",
        "ajax、axios、fetch区别",
        "多路复用与多路分解",
        "UDP 协议",
        "TCP 协议",
        "网络层",
        "数据链路层",
        "物理层",
        "Post 和 Get 的区别？",
        "TLS/SSL 中什么一定要用三个随机数，来生成”会话密钥”？",
        "SSL 连接断开后如何恢复？",
        "RSA 算法的安全性保障？",
        "DNS 为什么使用 UDP 协议作为传输层协议？",
        "当你在浏览器中输入 Google.com 并且按下回车之后发生了什么？",
        "谈谈 CDN 服务？",
        "什么是正向代理和反向代理？",
        "负载平衡的两种实现方式？",
        "http 请求方法 options 方法有什么用？",
        "http1.1 和 http1.0 之间有哪些区别？",
        "网站域名加 www 与不加 www 的区别？",
        "即时通讯的实现，短轮询、长轮询、SSE 和 WebSocket 间的区别？",
        "怎么实现多个网站之间共享登录状态",
        "JavaScript Ajax读取一个xml文档并进行解析的实例",
        "JavaScript Ajax是什么？ajax的交互模型？",
        "jQuery 如何创建一个Ajax",
        "简述 JavaScript AJAX 的原理",
        "JavaScript AJAX 的优点",
        "JavaScript AJAX 的缺点",
        "JavaScript AJAX 的几种框架",
        "JavaScript AJAX 的过程是怎么样的",
        "JavaScript 简述Ajax异步机制，Ajax有哪些的好处和弊端，介绍下Ajax异步请求的原理和过程",
        "JavaScript XMLHttpRequest是什么、怎样完整地执行一次GET请求、怎样检测错误",
        "JavaScript flash，ajax各自的优缺点。在使用中如何取舍",
        "JavaScript 如何得到HTTP的请求头信息和返回的头信息",
        "JavaScript 页面编码和被请求的资源编码如果不一致如何处理",
        "JavaScript AJAX同步和异步的区别",
        "JavaScript GRT和POET区别？何时使用post？",
        "JavaScript get为什么比post性能好，php/node都用一个东西接收post和get请求，怎么解释get比post性能好",
        "WEB应用从服务器主动推送Data到客户端有哪些方式",
        "JavaScript 跨域怎么实现?如何解决跨域问题",
        "JavaScript jsonP有哪几种方式？",
        "JavaScript 用 a.com 引用了网页 b.com 的js；js是否能读a.com。能够读b.com",
        "AJAX 的状态码有哪些",
        "HTTP状态码有哪些？分别代表什么意思？",
        "http状态吗100,200,300,400,500分别代表什么意思？",
        "聊聊 cache-control",
        "实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？",
        "JavaScript 使用AJax Post方式向页面check.do发送请求；请求的数据是userID=“admin”，password=“ABC”，假设服务器返回”OK”是成功，客户端踏出”验证通过提示框”",
        "iframe的优缺点",
    ]

    getFile(dir_name)
    getMd()
