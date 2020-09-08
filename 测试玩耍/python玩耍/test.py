import requests
from bs4 import BeautifulSoup
import json

import os
import time
# 发送请求


def axios(Authorization, ind=1):
    url = "http://nwgateway.shanglv51.com/domestichotel/ck/app/hotels?locationID=&address=&arriveDate=2020-09-07&bedType=0&brandName=&breakfast=0&cancelRule=0&companyID=1901111714441860c0400232327&confirmation=0&departureDate=2020-09-08&distance=&facility=0&keyWord=&pageSize=20&paymentType=0&price=&searchType=2&sort=&star=&theme=&rating=&travelCharge=0&type=1&lat=30.57613912400076&lng=104.07056297370212&cityName=%E6%88%90%E9%83%BD&locationType=0&searchId=&pageIndex=" + \
        str(1)
    headers = {'Accept': 'application/json,text/plain,*/*', 'Accept-Encoding': 'gzip,deflate', 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
               'Host': 'nwgateway.shanglv51.com', 'Origin': 'http', '//172.17.1.243': '40001/', 'Proxy-Connection': 'keep-alive', 'Referer': 'http', 'User-Agent': 'Mozilla/5.0(Linux;Android6.0;Nexus5Build/MRA58N)AppleWebKit/537.36(KHTML,likeGecko)Chrome/81.0.4044.138MobileSafari/537.36'}

    headers['Authorization'] = Authorization
    res = requests.get(url, headers=headers).text
    return res
pass


# 处理数据
Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTAxMTAwOTQ4MzY3ODEwYzEyMDAyMzcyMzMiLCJ1c2VySUQiOiIxOTAxMTAwNjQ4MzY3ODEwYzEyMDAyMzcyMzM3IiwiY29tcGFueUlEIjoiMTkwMTExMTc5NDQ0MTg2MGMwNDAwMjMyMzI3OCIsInVzZXJBY2NvdW50IjoiMTU5Mjg0MDYzMzc2IiwicGFydG5lckNvZGUiOiIwMSIsImlhdCI6MTU5OTQ1OTA1NSwiZXhwIjoxNTk5NDYwMjU1fQ.61sMkh-bdTK8SLBMV7NqhurVvDvVHalCnhhZAbacnP8"
ind = 1
res = axios(Authorization, ind)
json_str = json.loads(res)

data = json_str['data']
imgs = []
for item in data:
    imgs.append(item['thumbnailId'])
print("imgs", imgs)

# 保存数据
# fp = open("a.json", 'w', encoding='utf-8', errors='ignore')
# json_save = json.dumps(imgs, ensure_ascii=False,indent=4)
# fp.write(json_save)


# 下载图片
# imgs

# with open("/tmp/foo.txt") as file:
#     data = file.read()

#保存图片，思路：将所有的图片保存在本地的一个文件夹下，用图片的url链接的后缀名来命名
dir_name = 'teacherImage'    #设置文件夹的名字
if not os.path.exists(dir_name):     #os模块判断并创建
    os.mkdir(dir_name)

for img_url in imgs:
    time.sleep(1)   #设置间隔时间，防止把网页爬崩
    picture_name = img_url.split('/')[-1]     #提取图片url后缀
    reponse = requests.get(img_url)
    with open(dir_name+'/'+picture_name,'wb') as f:  # 还有遍历的作用
        f.write(reponse.content)