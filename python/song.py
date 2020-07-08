import requests


def FileStore(content, filepath):
    with open(filepath, 'wb') as f:
        f.write(content)
# 获取音乐文件链接


def GetLink(url, data, headers):
    try:
        rsp = requests.post(url, data=data, headers=headers)
        link = rsp.text[rsp.text.index('http'):rsp.text.index('mp3')]+'mp3'
        link = link.replace('\\', '')
        return link
    except:
        print('音乐文件丢失')
# 获取网站内容


def MusicSpider(url, data, headers):

    a = 1
    rsp = requests.post(url, data=data, headers=headers)
    print("rsp", rsp)
    content = rsp.text
    tp = content[content.index('('):content.index('])')]+'])'
    str1 = tp[1:-1]
    l = eval(str1)
    llist = []
    for i in l:
        d = i
        id = d.get('id')
        name = d.get('name')
        artist = d.get('artist')
        album = d.get('album')
        tt = {'id': str(id), 'name': name}
        llist.append(tt)
        temp = str(a)+'-\t'+'id:'+str(id)+'\t'+'名称:'+name + \
            '\t'+'作者:'+str(artist)+'\t'+'专辑:'+album+'\n'
        print(temp)
        a = a+1
    return llist


def DownloadMusic(url, headers, filename):
    msc = requests.get(url, headers=headers)
    with open(filename+'.mp3', 'wb') as f:
        f.write(msc.content)
# 主程序


def Main():
    # 下面链接里的一串数字随便改都行，只要保持格式位数不变就行，自己用代码时一定要改一下，不然可能失效
    # 链接挂了 不是不能用
    url = "https://music.zhuolin.wang/api.php?callback=jQuery1113049032309587120504_1584182314587"
    name = input('请输入关键词：\n')
    data = {
        'types': 'search',
        'count': '20',
        'source': 'netease',
        'pages': '1',
        'name': name
    }

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
    }
    llist = MusicSpider(url, data, headers)
    index_1 = input('请输入你要下载音乐的序号\n')
    ddict = llist[int(index_1)-1]  # 和第31行对应
    print('正在获取链接……')
    data2 = {
        'types': 'url',
        'id': ddict.get('id'),
        'source': 'netease'
    }
    link = GetLink(url, data2, headers)  # 得到音乐直链
    print('音乐直链为：')
    print(link)
    print('下载中……')
    DownloadMusic(link, headers, ddict.get('name'))
    print('下载成功！')


while True:
    try:
        Main()
    except Exception as e:
        print('错误', e)
