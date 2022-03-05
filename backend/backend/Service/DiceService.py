import random


def dice(text):
    if(text=='今日运势'):
        tmp="今天你的运势为"+random.choice(['大吉','中吉','小吉','末吉','小凶','大凶'])
        return tmp
    if (text == '掷骰子'):
        tmp = "掷出了" + random.choice(['1', '2', '3', '4', '5', '6'])+"点"
        return tmp

    if (text == '抽牌'):
        tmp = "抽到了" + random.choice(['♠', '♥', '♣', '♦'])+random.choice(['A', '2', '3', '4','5', '6', '7', '8','9', '10', 'J', 'Q','K'])
        return tmp

    return text