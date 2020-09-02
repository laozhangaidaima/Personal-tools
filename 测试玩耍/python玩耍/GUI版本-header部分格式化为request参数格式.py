# requests的header进行转换的小脚本
# 键值对中不能出现冒号 因为是通过split进行分割的

from tkinter import *

def go():
    text2 = Text(root)
    text2.pack()
    res = text.get('0.0', 'end')
    res = test_json(res)
    text2.insert(INSERT, res)

def test_json(text):

    # 去除所有空格
    text = text.replace(" ", "")

    # 行尾加上冒号
    res = text.replace('\n', ':')

    # 分割每一行
    line = res.split(':')
    # 去除最后一位多出的''
    line.pop()

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
    return json_dict


root = Tk()
# 标题
text1 = Label(root, text="请输入待格式化字符")
text1.pack()


# 待转换字符
text = Text(root)
# text.insert(INSERT, "Hello.....")
text.pack()

# 点击按钮
btn = Button(root, text="一键转换", command=go)
btn.pack()


root.mainloop()
