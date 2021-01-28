import os
import re


# 创建文件夹 如果没有不会自动创建
def getFile(dir_name):
    if not os.path.exists(str(dir_name)):  # os模块判断并创建
        os.mkdir(dir_name)
    return dir_name

# 转换为md独立文件


def getMd():
    rstr = r"[\/\\\:\*\?\"\<\>\|\\\n]"  # '/ \ : * ? " < > |'  去除不合法文件名
    rstr2 = r"[\#]"  # 去除#
    rstr3 = r"[\n]"  # 去除换行
    for line in open("text.txt", 'r', encoding='UTF-8'):
        # 获取md文件名 以#### 作为分割
        if '####' in line:
            md_name = re.sub(rstr, "_", line)  # 替换为下划线
            md_name = re.sub(rstr2, "", md_name)  # 替换为下划线
        # 创建md文件   逐行写入到对应md文件
        # with open可以创建md文件 
        else:
            with open(dir_name+'/' + md_name+'.md', 'a', encoding='UTF-8') as f:
                line = re.sub(rstr3, "", line)  # 替换为下划线
                f.writelines(line)
                f.write('\n')


if __name__ == "__main__":
    dir_name = 'html'  # 文件名
    md_name = ''  # md文件名
    getFile(dir_name)
    getMd()
