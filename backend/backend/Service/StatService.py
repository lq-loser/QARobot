import json

import jieba

from ..models import APIorder, Record

# 加载停用词列表
f_stop = open(r'C:\Users\Administrator\Desktop\my project2\SE128_C3_12\backend\backend\Service\cn_stopwords.txt',
              encoding='utf-8')  # 自己的中文停用词表,可以根据实际情况再额外添加停用词
stopwords = [line.strip() for line in f_stop]
f_stop.close()


# 提问词语频率统计
# 词语出现次数的数据结构
def getCount(elem):
    return elem['count']


class word_frec_list:
    def __init__(self):
        self.data = []

    def add_set(self, tmplist):
        for w in tmplist:
            if w not in stopwords:
                found = False
                for y in self.data:
                    if y['name'] == w:
                        y['count'] = y['count'] + 1
                        found = True
                        break
                if not found:
                    self.data.append({"name": w, "count": 1})

    def tojson(self):
        (self.data).sort(key=getCount, reverse=True)
        tmp = json.dumps(self.data, ensure_ascii=False)
        return tmp


def word_frec_stat(api_order_id, alltime, date1, date2):
    apiorder = APIorder.objects.get(orderid=api_order_id)
    # if alltime == "false":
    #    # records = Record.objects.filter(apiorder=apiorder, datetime_gte=start_time, datetime_lte=end_time)
    # else:
    records = Record.objects.filter(apiorder=apiorder)
    total_list = word_frec_list()
    for x in records:
        tmplist = jieba.lcut(x.content)
        total_list.add_set(tmplist)

    tmp = total_list.tojson()
    return tmp

# 提问时间频率统计
# def time_frec_stat(api_order_id,time_scale,start_time,end_time):
