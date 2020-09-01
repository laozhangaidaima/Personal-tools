import requests
r = requests.get('https://api.github.com/events')
# r.text
txt = r.json()
print(txt)
# print("r.encoding",r.encoding)
