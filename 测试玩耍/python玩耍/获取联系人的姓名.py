import requests
import json

# Authorization会过期 要更换
headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTAxMTAwOTQ4MzY3ODEwYzEyMDAyMzcyMzMiLCJ1c2VySUQiOiIxOTAxMTAwOTQ4MzY3ODEwYzEyMDAyMzcyMzMwIiwiY29tcGFueUlEIjoiMTkwNDExMTcxNDQ0MTg2MGMwNDAwMjMyMzI3MyIsInVzZXJBY2NvdW50IjoiMTU5Mjg0NDYxMzc4IiwicGFydG5lckNvZGUiOiIwMSIsImlhdCI6MTU5OTAxMDIzNSwiZXhwIjoxNTk5MDExNDM1fQ.QsbO42bnTS9EX7ylkVO87K44BTfWHgo7_qVBYZbDpm4"
}
response = requests.get(
    'http://nwgateway.shanglv51.com/cuser/travelman/getAllTravelMan?search=&scene=train&applyID=', headers=headers)

text = response.text

# json处理
json_str = json.loads(text)
sites = json_str['data']['travelManList']

# 保存出行人
persoin = []
fp = open("b.json", 'w', encoding='utf-8', errors='ignore')
for site in sites:
    if site['sex'] == 1:
        site['sex'] = '女'
    if site['sex'] == 0:
        site['sex'] = '男'
    persoin.append(
        {
            '姓名': site['contactsName'],
            '生日': site['birthDate'],
            '性别': '男' if site['sex'] == 1 else '女'
        }
    )
# 保存前必须处理json格式
json_save = json.dumps(persoin, ensure_ascii=False)
print(json_save)
fp.write(json_save)
