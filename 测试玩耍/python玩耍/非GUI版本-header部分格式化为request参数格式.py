import json
# """ 后的首字母必须要顶格 不能有换行
text = """Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cache-Control: max-age=0
Cookie: PHPSESSID=5csbn62mv1j6veugipb3p9eb54; UM_distinctid=1744727c4c2208-071f2cd00ca72d-474b002e-1fa400-1744727c4c3586; href=http%3A%2F%2Fyun.itheima.com%2F; bad_id994d4130-1df9-11e9-b7ec-7766c2691ec6=149c1aa1-ebee-11ea-aafd-ff845b28113b; nice_id994d4130-1df9-11e9-b7ec-7766c2691ec6=149c1aa2-ebee-11ea-aafd-ff845b28113b; CNZZDATA1261487506=508351789-1598916335-https%253A%252F%252Fwww.google.com%252F%7C1599012910; qimo_seosource_994d4130-1df9-11e9-b7ec-7766c2691ec6=%E7%AB%99%E5%86%85; qimo_seokeywords_994d4130-1df9-11e9-b7ec-7766c2691ec6=; accessId=994d4130-1df9-11e9-b7ec-7766c2691ec6; pageViewNum=1
Host: yun.itheima.com
Proxy-Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"""

# 去除所有空格
text = text.replace(" ", "")

# 行尾加上冒号
res = text.replace('\n', ':')

# 分割每一行
line = res.split(':')

# 键值对分别存储
i = 1
even = []
odd = []
for item in line:
    # 偶数
    if i % 2 == 0:
        even.append(item)
    # 奇数
    else:
        odd.append(item)
    i += 1

# 键值对 合并为字典 重组
json_dict = {}
ind = 0
for oddLine in odd:
    json_dict[odd[ind]] = even[ind]
    ind = ind+1

# 保存到文件
fp = open("a.json", 'w', encoding='utf-8', errors='ignore')
json_save = json.dumps(json_dict, ensure_ascii=False, indent=4)
fp.write(json_save)
