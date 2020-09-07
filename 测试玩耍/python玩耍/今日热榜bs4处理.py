import requests
from bs4 import BeautifulSoup
import re

# 发送请求
url = "https://tophub.today/"
headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip,deflate,br',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'max-age=0',
    'cookie': 'UM_distinctid=173f9f90e393a4-05e23c61df6cc3-474b002e-1fa400-173f9f90e3ab1e;Hm_lvt_3b1e939f6e789219d8629de8a519eab9=1597626717,1598231066,1598920939;CNZZDATA1276310587=1545887956-1597621984-%7C1599112513;Hm_lpvt_3b1e939f6e789219d8629de8a519eab9=1599116812',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0(WindowsNT6.1;WOW64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/81.0.4044.138Safari/537.36'
}

res = requests.get(url, headers=headers).text

#  bs4的使用
soup = BeautifulSoup(res, "lxml")

text1 = soup.select(
    "#node-1 .t")

print(text1)

# select的结果是列表 必须要遍历才能用string
for i in text1:
    print(i.string)


# text1 = soup.select(
#     ".cc-cd-lb span")

# # select的结果是列表 必须要遍历才能用string
# for i in text1:
#     print(i.string)
