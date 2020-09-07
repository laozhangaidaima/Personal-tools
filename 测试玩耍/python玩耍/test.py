import requests
from bs4 import BeautifulSoup
import json
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
Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTAxMTAwOTQ4MzY3ODEwYzEyMDAyMzcyMzMiLCJ1c2VySUQiOiIxOTAxMTAwOTI4MzY3ODEwYzEyMDAyMzcyMzM4IiwiY29tcGFueUlEIjoiMTkwNDExMTcxNDQ0MTg2MGMwNDAwMjMyMzI3MyIsInVzZXJBY2NvdW50IjoiMTU5Mjg0MDYzMzc2IiwicGFydG5lckNvZGUiOiIwMSIsImlhdCI6MTU5OTQ0NTkwOCwiZXhwIjoxNTk5NDQ3MTA4fQ.jsCzNQO1NEn4WEkzDSNRaFDKG9wsh-ql3W9dRk36RmI"
ind = 1
res = axios(Authorization, ind)
json_str = json.loads(res)

data = json_str['data']
imgs = []
for item in data:
    imgs.append(item['thumbnailId'])
print("imgs",imgs)

# 保存数据
fp = open("a.json", 'w', encoding='utf-8', errors='ignore')
json_save = json.dumps(imgs, ensure_ascii=False,indent=4)
fp.write(json_save)
