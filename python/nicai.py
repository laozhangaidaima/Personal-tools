# -*- coding:UTF-8 -*-
from bs4 import BeautifulSoup
import requests

if __name__ == '__main__':
    target = 'https://www.juzikong.com/collections/2707751a-63c1-4115-9986-ee91d2363680'
    req = requests.get(url=target)
    req.encoding = 'GBK'  # 增加encoding=‘GBK’，解决中文乱码问题
    soup = BeautifulSoup(req.text, 'lxml')
    print("soup",soup)
    # texts = soup.find_all('div', class_='showtxt')
    # print(texts[0].text.replace('\xa0'*8, '\n\n'))


