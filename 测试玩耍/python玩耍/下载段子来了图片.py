import requests
from bs4 import BeautifulSoup
import json
import os
import time
from furl import furl

# 发送请求


def axios():
    url = "https://mp.weixin.qq.com/s/lEvf1bJtGhFY1IzC0Il0nw"
    headers = {
        'User-Agent': 'Mozilla/5.0(Linux;Android6.0;Nexus5Build/MRA58N)AppleWebKit/537.36(KHTML,likeGecko)Chrome/81.0.4044.138MobileSafari/537.36'}
    headers['cookie'] = 'pgv_si=s7020309504; pgv_pvi=5499139072; _qpsvr_localtk=0.7884611992881148; RK=BW7xIo8zOt; ptcz=e427ec59e707f18317e3e2c303fdb41a5581253060a5e578b19080bf76abff4e; rewardsn=; wxtokenkey=777; wxuin=1051737861; devicetype=Windows7x64; version=62090538; lang=zh_CN; pass_ticket=c2u0I//tUHTnUzD959o365vjc7pK1ZU9BjUEx3trOmD4Wcs9mIoy4jDLpyTRuxx6; wap_sid2=CIX+wPUDEooBeV9ISG9mMFFaUXhpWEhHeDdVRHVoMXRIRFB2bDNDNjJpQjJQWDE2dUQ4cnNsb0ZtRnNsU250enBfU19uVFVGdTZfQWlhRG1UenJTRGk0Nkkxd3Z1NlhvcmZFd0JjVWxuMllRY1FmbWZlUVVwa3VLdXZHY2JlM0Yxc2NWT2FpTzNwSldCZ1NBQUF+MPyWj/wFOA1AAQ==; pgv_pvid=5928658016; _ga=GA1.2.200214559.1602669955; ua_id=E4j1NiGmaxZgVgtEAAAAAJAhzTnAPpHgGYzdEl3R-ms=; openid2ticket_oGs1IwpHobF3ApezFsPCzZCbCXAI=; mm_lang=zh_CN; verifysession=h015b74c464f0cf5226bb061502d9b48bbff6ae82470d2b4a53a3fdbfe58b6e1b44da56567afc1a52db; pgv_info=ssid=s8545171676&pgvReferrer=; uuid=5e3949c7ac12d94df9111bd6f6723e6c; rand_info=CAESIKU16CVdPrcih4phNkMIuu1kkO0/eub5yJGloOygkk3D; slave_bizuin=3259551002; data_bizuin=3259551002; bizuin=3259551002; data_ticket=q6I290WLtKmgcpxuGgTdooPQEHqjsDrqiiPxKcjZqppLowBSqVXM1M/225nJSX2z; slave_sid=QmRIemJMNnZTUXlzYjBCTjJPRklHbVFTZ2NxNDJUdFpzdGhzWl85MURMYWZ4X0pjek1VV3RyM1lKZDlKTGJKb0JTNHR5TG5UcjJ2MWpqNEFReWNPUGYzbjN2MTNub1Fqc3VZQmNNWExRb29VZjlmdkJvdnNsYVpNN3owVTMzMWJQWHVFWEdySWxmRFlCOU1H; slave_user=gh_870860437d2f; xid=018433d61eb21a769683f5a1ef662686; logout_page=dm_loginpage; qm_authimgs_id=2; qm_verifyimagesession=h0187e4439cf9ad8bc39232bfe1b15f2f30e320779e8fdddbb7ee82ffd45ee8430574a10a71c1fd3a84'
    res = requests.get(url, headers=headers)
    return res.text


pass


# 处理数据
res = axios()

#  bs4的使用
encoding = "gb18030"
soup = BeautifulSoup(res, fromEncoding=encoding)
# 获取图片
img = soup.find_all("img")

# 保存图片url
imgs = []
for item in img:
    imgs.append(item.get('data-src'))
# 下载图片
# 保存图片，思路：将所有的图片保存在本地的一个文件夹下，用图片的url链接的后缀名来命名
dir_name = soup.select('h2')[0].string  # 设置文件夹的名字
dir_name = dir_name.replace("\n", "")
dir_name = dir_name.strip()


print('dir_name', dir_name)

if not os.path.exists(str(dir_name)):  # os模块判断并创建
    os.mkdir(dir_name)

# 保存图片
picture_name = 0
for img_url in imgs:
    time.sleep(1)  # 设置间隔时间，防止把网页爬崩
    if img_url:
        f = furl(img_url)
        reponse = requests.get(img_url)
        # 还有遍历的作用
        with open(dir_name+'/'+str(picture_name)+str('.') + str(f.args['wx_fmt']), 'wb') as f:
            f.write(reponse.content)
        picture_name += 1
