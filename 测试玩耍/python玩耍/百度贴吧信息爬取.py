# 导入需要的包
import time  # 导入time库
import requests  # 导入requests库
from bs4 import BeautifulSoup  # 导入BeautifulSoup库
import pandas as pd  # 导入pandas库
from urllib import parse  # 导入parse


# 提取帖子信息
def tqtz(page_lst):
    tmp = []  # 建一个空列表来存储信息，用列表保存字典数据，每一个帖子都是一个字典数据
    for i in page_lst:
        # 判断是否超过回复阈值
        if int(i.find(class_='threadlist_rep_num').text) > Threshold:
            dic = {}  # 建一个空字典来存储数据
            # 回复数
            dic['回复数'] = int(i.find(class_='threadlist_rep_num').text)
            # 帖子名称
            dic['名字'] = i.find(class_='threadlist_title').text
            # 帖子地址
            dic['地址'] = 'https://tieba.baidu.com' + \
                i.find(class_='threadlist_title').a['href']
            tmp.append(dic)  # 把字典信息存储到空列别熬tmp
    return tmp


# 获取数据信息
def hqsj(num):
    target = []
    # 发起n次的get请求
    for i in range(num):
        # 跟踪显示进度
        print('目前正在爬取的页数是:', i)
        # 百度贴吧网址翻页数据为50,100,150……
        target_url = template_url.format(50*i)
        res = requests.get(target_url)
        # 转换为 bs 对象
        soup = BeautifulSoup(res.text, 'html.parser')
        # 获取该页帖子列表
        page_lst = soup.find_all(class_='j_thread_list')
        # 该页信息保存到target
        target.extend(tqtz(page_lst))
        # 休息1秒再访问，以防被百度屏蔽反爬
        time.sleep(1)
    return target


if __name__ == '__main__':
    while True:
        kw = input('请输入你要爬取的贴吧关键字:').strip()
        word = parse.urlencode({'kw': kw})  # 转换为url编码
        url = 'https://tieba.baidu.com/f?'
        # 组合后的url，示例;[url=http://tieba.baidu.com/f?kw=lol]http://tieba.baidu.com/f?kw=lol[/url]
        new_url = url + word
        template_url = new_url + "&ie=utf-8&pn={}"
        # 设置回复数阈值
        Threshold = int(input("请输入回复数的闸值"))
        # 爬取贴吧前200页数据
        num = int(input("请输入要爬取的页数"))
        # file_name = str(input("请输入保存文件名称"))
        nums = hqsj(num)
        # 转化为pandas.DataFrame对象
        data = pd.DataFrame(nums)
        # 导出到excel表格
        data.to_excel(kw + '.xlsx')
        break
