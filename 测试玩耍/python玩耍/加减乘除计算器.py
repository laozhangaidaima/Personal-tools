import random  # 导入随机数库
import time  # 导入时间库


def Compared(result, answer):  # 定义一个验证是否正确的函数
    if result == answer:  # 如果输入的答案等于结果就：
        print("太棒了，你的回答完全正确！")  # 打印显示回答正确
        print("*" * 100)
    else:  # 如果不
        print("很抱歉，你的回答错误！")  # 回答错误
        print("正确答案是：" + str(result))  # 正确答案
        print("*"*100)


print("欢迎使用随机数四则运算出题软件--创造太阳工作室")
num1 = int(input("请输入要练习的数字开始值（如：100），后按回车键    "))  # 输入要练习的随机数开始值
# 输入要练习的随机数结束值，结束值要大于开始值
num2 = int(input("请输入要练习的数字结束值，该值需要大于开始值（如：999），后按回车键     "))

Arithmetic = int(
    input("请选择要练习的四则运算，加法请输入1，减法请输入2，乘法请输入3.除法请输入4,随机请输入0，后按回车键     "))  # 输入四则运算的选择

while 1 > 0:  # 只要1>0持续循环
    if Arithmetic == 1:  # 输入1，代表选择加法运算
        a = random.randint(num1, num2)  # 生成随机数a
        b = random.randint(num1, num2)  # 生成随机数b
        print(str(a) + "+" + str(b) + "= ?")  # 打印题目
        result = a + b  # 计算结果
        starttime = time.time()  # 开始时间
        answer = int(input("请输入你的答案"))  # 输入答案
        endtime = time.time()  # 结束时间
        print("并行执行时间为：", (endtime - starttime), "秒")  # 耗时
        Compared(result, answer)  # 调用验证答案的函数Compared
    if Arithmetic == 2:  # 减法，注释见上
        a = random.randint(num1, num2)
        b = random.randint(num1, num2)
        print(str(a) + "-" + str(b) + "= ?")
        result = a - b
        starttime = time.time()
        answer = int(input("请输入你的答案"))  # 输入答案
        endtime = time.time()
        print("并行执行时间为：", (endtime - starttime), "秒")
        Compared(result, answer)  # 调用验证答案的函数Compared
    if Arithmetic == 3:
        a = random.randint(num1, num2)
        b = random.randint(num1, num2)
        print(str(a) + "*" + str(b) + "= ?")
        result = a * b
        starttime = time.time()
        answer = int(input("请输入你的答案"))  # 输入答案
        endtime = time.time()
        print("并行执行时间为：", (endtime - starttime), "秒")
        Compared(result, answer)  # 调用验证答案的函数Compared
    if Arithmetic == 4:
        a = random.randint(num1, num2)
        b = random.randint(num1, num2)
        print(str(a) + "/" + str(b) + "= ?")
        result = a / b
        starttime = time.time()
        answer = float(input("请输入你的答案"))  # 输入答案
        endtime = time.time()
        print("并行执行时间为：", (endtime - starttime), "秒")
        Compared(result, answer)  # 调用验证答案的函数Compared
    if Arithmetic == 0:  # 输入选择随机练习0
        a = random.randint(num1, num2)
        b = random.randint(num1, num2)
        symbol = random.choice(['+', '-', '*', '/'])  # 生成随机符号
        if symbol == '+':
            print(str(a) + "+" + str(b) + "= ?")
            result = a + b
            starttime = time.time()
            answer = int(input("请输入你的答案"))  # 输入答案
            endtime = time.time()
            print("并行执行时间为：", (endtime - starttime), "秒")
            Compared(result, answer)  # 调用验证答案的函数Compared
        if symbol == '-':
            print(str(a) + "-" + str(b) + "= ?")
            result = a - b
            starttime = time.time()
            answer = int(input("请输入你的答案"))  # 输入答案
            endtime = time.time()
            print("并行执行时间为：", (endtime - starttime), "秒")
            Compared(result, answer)  # 调用验证答案的函数Compared
        if symbol == '*':
            print(str(a) + "*" + str(b) + "= ?")
            result = a * b
            starttime = time.time()
            answer = int(input("请输入你的答案"))  # 输入答案
            endtime = time.time()
            print("并行执行时间为：", (endtime - starttime), "秒")
            Compared(result, answer)  # 调用验证答案的函数Compared
        if symbol == '/':
            print(str(a) + "/" + str(b) + "= ?")
            result = a / b
            starttime = time.time()
            answer = float(input("请输入你的答案"))  # 输入答案
            endtime = time.time()
            print("并行执行时间为：", (endtime - starttime), "秒")
            Compared(result, answer)  # 调用验证答案的函数Compared
