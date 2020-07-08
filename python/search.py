import requests
from lxml import etree
from fake_useragent import UserAgent
import os
import urllib

# 设置headers
ua = UserAgent()
headers = {
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
    'Connection': 'close',
    "User-Agent": ua.random
}

# 获取url链接的xml格式


def getxml(url):
    res = requests.get(url, headers, timeout=30)
    res.encoding = res.apparent_encoding
    text = res.text
    xml = etree.HTML(text)
    return xml

# 获取文章内容


def getcontent(xml):
    data = xml.xpath('//div[@class="readcontent"]/text()')
    for text in data:
        if text == '\n':
            pass
        else:
            f.write(text.replace('\n', ''))

# 获取整本小说


def getbook(url):
    # 获取小说全部章节及链接
    xmllist = getxml(url)
    name = xmllist.xpath('//h1/text()')
    chapters = xmllist.xpath('//div[@id="list-chapterAll"]//dd/a/text()')
    links = xmllist.xpath('//div[@id="list-chapterAll"]//dd/a/@href')
    print('《' + name[0] + '》' + '已获取,共' + str(len(links)) + '章\n')
    # 进入小说章节页，爬取章节内容，并存入txt文档中
    f.write(name[0]+'\n\n\n')
    for i in range(0, 2):
        f.write('\n' + chapters[i] + '\n')
        urltxt = 'https://www.oldtimescc.cc/go/42472/' + links[i]
        xmlcont = getxml(urltxt)
        page = xmlcont.xpath('//div[@class="book read"]//small/text()')
        getcontent(xmlcont)
        if '(1/2)' in page:
            urltxt2 = urltxt[0:-5] + '_2.html'
            xmlcont2 = getxml(urltxt2)
            getcontent(xmlcont2)
        print(chapters[i] + ': 已完成')
    f.close()


searchname = input('请输入小说名：')
f = open('E:/'+searchname+'.txt', 'w', encoding='utf-8')
search = urllib.parse.quote(searchname.encode('gbk'))
searchurl = 'https://www.oldtimescc.cc/modules/article/search.php?searchkey='+search
print(searchname + '正在搜索中......')
searchxml = getxml(searchurl)
try:
    bookname = searchxml.xpath('//div[@class="bookinfo"]/h1/text()')
    getbook(searchurl)
    print('下载完成，已保存在E盘根目录中！')
except:
    print('未查找到'+searchname+',请重试！')
