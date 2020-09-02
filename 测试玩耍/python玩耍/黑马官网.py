import requests
import re

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'max-age=0',
    'Cookie': 'PHPSESSID=5csbn62mv1j6veugipb3p9eb54; UM_distinctid=1744727c4c2208-071f2cd00ca72d-474b002e-1fa400-1744727c4c3586; href=http%3A%2F%2Fyun.itheima.com%2F; bad_id994d4130-1df9-11e9-b7ec-7766c2691ec6=149c1aa1-ebee-11ea-aafd-ff845b28113b; nice_id994d4130-1df9-11e9-b7ec-7766c2691ec6=149c1aa2-ebee-11ea-aafd-ff845b28113b; CNZZDATA1261487506=508351789-1598916335-https%253A%252F%252Fwww.google.com%252F%7C1599012910; qimo_seosource_994d4130-1df9-11e9-b7ec-7766c2691ec6=%E7%AB%99%E5%86%85; qimo_seokeywords_994d4130-1df9-11e9-b7ec-7766c2691ec6=; accessId=994d4130-1df9-11e9-b7ec-7766c2691ec6; pageViewNum=1',
    'Host': 'yun.itheima.com',
    'Proxy-Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
}
response = requests.get(
    'http://yun.itheima.com/open/0-7-1-2-0.html?2005stt=123', headers=headers)

text = response.text

ret = re.findall('\d+', text)

print(ret)
