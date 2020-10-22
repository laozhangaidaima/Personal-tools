import requests
from bs4 import BeautifulSoup
import json
import os
import time
from furl import furl
import re

# 发送请求


def axios(url):
    headers = {
        'User-Agent': 'Mozilla/5.0(Linux;Android6.0;Nexus5Build/MRA58N)AppleWebKit/537.36(KHTML,likeGecko)Chrome/81.0.4044.138MobileSafari/537.36'}
    headers['cookie'] = 'pgv_si=s7020309504; pgv_pvi=5499139072; _qpsvr_localtk=0.7884611992881148; RK=BW7xIo8zOt; ptcz=e427ec59e707f18317e3e2c303fdb41a5581253060a5e578b19080bf76abff4e; rewardsn=; wxtokenkey=777; wxuin=1051737861; devicetype=Windows7x64; version=62090538; lang=zh_CN; pass_ticket=c2u0I//tUHTnUzD959o365vjc7pK1ZU9BjUEx3trOmD4Wcs9mIoy4jDLpyTRuxx6; wap_sid2=CIX+wPUDEooBeV9ISG9mMFFaUXhpWEhHeDdVRHVoMXRIRFB2bDNDNjJpQjJQWDE2dUQ4cnNsb0ZtRnNsU250enBfU19uVFVGdTZfQWlhRG1UenJTRGk0Nkkxd3Z1NlhvcmZFd0JjVWxuMllRY1FmbWZlUVVwa3VLdXZHY2JlM0Yxc2NWT2FpTzNwSldCZ1NBQUF+MPyWj/wFOA1AAQ==; pgv_pvid=5928658016; _ga=GA1.2.200214559.1602669955; ua_id=E4j1NiGmaxZgVgtEAAAAAJAhzTnAPpHgGYzdEl3R-ms=; openid2ticket_oGs1IwpHobF3ApezFsPCzZCbCXAI=; mm_lang=zh_CN; verifysession=h015b74c464f0cf5226bb061502d9b48bbff6ae82470d2b4a53a3fdbfe58b6e1b44da56567afc1a52db; pgv_info=ssid=s8545171676&pgvReferrer=; uuid=5e3949c7ac12d94df9111bd6f6723e6c; rand_info=CAESIKU16CVdPrcih4phNkMIuu1kkO0/eub5yJGloOygkk3D; slave_bizuin=3259551002; data_bizuin=3259551002; bizuin=3259551002; data_ticket=q6I290WLtKmgcpxuGgTdooPQEHqjsDrqiiPxKcjZqppLowBSqVXM1M/225nJSX2z; slave_sid=QmRIemJMNnZTUXlzYjBCTjJPRklHbVFTZ2NxNDJUdFpzdGhzWl85MURMYWZ4X0pjek1VV3RyM1lKZDlKTGJKb0JTNHR5TG5UcjJ2MWpqNEFReWNPUGYzbjN2MTNub1Fqc3VZQmNNWExRb29VZjlmdkJvdnNsYVpNN3owVTMzMWJQWHVFWEdySWxmRFlCOU1H; slave_user=gh_870860437d2f; xid=018433d61eb21a769683f5a1ef662686; logout_page=dm_loginpage; qm_authimgs_id=2; qm_verifyimagesession=h0187e4439cf9ad8bc39232bfe1b15f2f30e320779e8fdddbb7ee82ffd45ee8430574a10a71c1fd3a84'
    res = requests.get(url, headers=headers)
    return res.text

# bs4数据处理


def bsData(res, encoding):
    soup = BeautifulSoup(res, fromEncoding=encoding)
    return soup

# 获取图片url


def getImgUrl(soup):
    img = soup.find_all("img")
    imgs = []
    for item in img:
        imgs.append(item.get('data-src'))
    return imgs

# 获取title


def getTitle(soup):
    dir_name = soup.select('h2')[0].string  # 设置文件夹的名字
    dir_name = dir_name.replace("\n", "")
    dir_name = dir_name.strip()
    rstr = r"[\/\\\:\*\?\"\<\>\|]"  # '/ \ : * ? " < > |'  去除不合法文件名
    dir_name = re.sub(rstr, "_", dir_name)  # 替换为下划线

    return dir_name

# 创建文件夹


def getFile(dir_name):
    if not os.path.exists(str(dir_name)):  # os模块判断并创建
        os.mkdir(dir_name)
    return dir_name

# 保存图片


def saveImgs(imgs, dir_name):
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
    print('下载完毕')
    return dir_name


# 处理数据
# 执行顺序不能变
# https://mp.weixin.qq.com/s/M9K8YbuoGBWsWGAfLDgZCw
# https://mp.weixin.qq.com/s/TOMzOZ1mh9uWUENkTGr5Ag
# https://mp.weixin.qq.com/s/1TGN601TFEidLkzCyC5Kaw
# https://mp.weixin.qq.com/s/94tvOB7AskrmB944_5eEVg
# https://mp.weixin.qq.com/s/ulbxz5F3dGiapT7qLRsTvw

if __name__ == "__main__":
    url = "https://mp.weixin.qq.com/s/ulbxz5F3dGiapT7qLRsTvw"  # 只要更改url即可
    res = axios(url)

    soup = bsData(res, 'gb18030')
    imgs = getImgUrl(soup)
    dir_name = getTitle(soup)
    getFile(dir_name)
    saveImgs(imgs, dir_name)