# print('hello,woeld!') 
# print('312132312')

# a = 4
# print(a)


# age = 18 
# print("老子今年：%d岁"%age)

# password = input("请输入密码：")
# print("你刚刚输入的密码：",password )

# import keyword
# # keyword.kwlist
# print("keyword",keyword)


# str='Runoob'
 
# print(str)                 # 输出字符串
# print(str[0:-1])           # 输出第一个到倒数第二个的所有字符
# print(str[0])              # 输出字符串第一个字符
# print(str[2:5])            # 输出从第三个开始到第五个的字符
# print(str[2:])             # 输出从第三个开始后的所有字符
# print(str * 2)             # 输出字符串两次
# print(str + '你好')        # 连接字符串


# print('老子 你爸 爸')

# input("\n\n按下 enter 键后退出。")

# x="a"
# y="b"
# # 换行输出
# print( x )
# print( y )

# x="a"
# y="b"
# print( x, end=" " )
# print( y, end=" " )

# import sys
# print('================Python import mode==========================')
# print ('命令行参数为:')
# for i in sys.argv:
#     print (i)
# print ('\n python 路径为',sys.path)


# from sys import argv,path  #  导入特定的成员
 
# print('================python from import===================================')
# print('path:',path) # 因为已经导入path成员，所以此处引用时不需要加sys.path


# counter = 100          # 整型变量
# miles   = 1000.0       # 浮点型变量
# name    = "runoob"     # 字符串

# print (counter)
# print (miles)
# print (name)



# a, b, c, d = 20, 5.5, True, 4+3j
# print(type(a), type(b), type(c), type(d))

# print(17 % 3)


# word = 'Python'
# print(word[0], word[5])
# print(word[-1], word[-6])

# print(2/1)

# a, b = 0, 1
# while b < 10:
#     print(b)
#     a, b = b, a+b


# age = int(input("请输入你家狗狗的年龄: "))
# print("")
# if age <= 0:
#     print("你是在逗我吧!")
# elif age == 1:
#     print("相当于 14 岁的人。")
# elif age == 2:
#     print("相当于 22 岁的人。")
# elif age > 2:
#     human = 22 + (age -2)*5
#     print("对应人类年龄: ", human)
 
# ### 退出提示
# input("点击 enter 键退出")

# var = 1
# while var == 1 :  # 表达式永远为 true
#    num = int(input("输入一个数字  :"))
#    print ("你输入的数字是: ", num)
 
# print ("Good bye!")


# list=[1,2,3,4]
# it = iter(list)    # 创建迭代器对象
# print (next(it)) 
# print (next(it)) 
# print (next(it)) 
# print (next(it)) 


# def hello() :
#    print("Hello World!")
# hello()

# def printme( str ):
#    "打印任何传入的字符串"
#    print (str)
# printme("123")

# sum = lambda arg1, arg2: arg1 + arg2
# print ("相加后的值为 : ", sum( 10, 20 ))

import sys
 
print('命令行参数如下:',sys)
# for i in sys.argv:
#    print(i)
 
# print('\n\nPython 路径为：', sys.path, '\n')




