import requests
from lxml import html

try:
    url = 'https://movie.douban.com/'  # 需要爬数据的网址
    data = {

        'type': 'movie',
        'tag': '热门',
        'page_limit': 50,
        'page_start': 0,
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    }

    res = requests.get(url, data)
    print("res", res)
    # res = requests.get(url)
except Exception as e:
    print('错误', e)


# page = requests.Session().get(url)
# tree = html.fromstring(page.text)
# result = tree.xpath('//td[@class="title"]//a/text()')  # 获取需要的数据
