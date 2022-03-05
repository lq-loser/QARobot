import json
from django.forms import model_to_dict
from django.http import HttpResponse
from ..models import User
from ..models import Developer
from ..models import API
from ..models import APIorder
import datetime


def addOrder(userid, apiid, devid, length):
    count = 0
    start_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M')
    print('start_date:' + start_time)
    end_time = (datetime.datetime.now() + datetime.timedelta(days=length)).strftime("%Y-%m-%d %H:%M")
    print(end_time)
    if APIorder.objects.filter(dev_id=devid, api_id=apiid):
        preOrder = APIorder.objects.filter(dev_id=devid, api_id=apiid)
        if datetime.datetime.now().strftime("%Y-%m-%d %H:%M") < preOrder[0].end_date.strftime('%Y-%m-%d %H:%M'):
            msg = '已有订单，不能再次购买'
            data = {'userdata': msg}
            return data
    order_obj = APIorder(dev_id=devid, start_date=start_time, end_date=end_time, count=count, api_id=apiid)
    try:
        order_obj.save()
    except Exception:
        print("add order error")
        msg = 'error'
        data = {'userdata': msg}
        return data
    else:
        msg = '恭喜您，订阅成功！'
        orderID = order_obj.orderid
        data = {'userdata': msg, 'apiid': apiid, 'devid': devid, 'orderid': orderID}
        return data


def getOrder(orderID):
    try:
        order = APIorder.objects.get(orderid=orderID)
    except Exception:
        print("get order error")
        msg = 'error'
        data = {'userdata': msg}
        return data
    else:
        msg = 'success'
        data = {'userdata': msg, 'devid': order.dev_id, 'orderid': order.orderid, 'apiid': order.api_id,
                'end_date': order.end_date.strftime('%Y-%m-%d %H'), 'count': order.count,
                'apiname': order.api.name, 'apiAddress': order.api.address}
        return data


def getAllOrders(devid):
    orders = APIorder.objects.filter(dev_id=devid)
    json = []
    if orders.count() >= 1:
        msg = 'success'
        for i in orders:
            delay = False
            if datetime.datetime.now().strftime('%Y-%m-%d %H:%M') > i.end_date.strftime('%Y-%m-%d %H:%M'):
                delay = True
            data = {'userdata': msg, 'devid': i.dev_id, 'orderid': i.orderid, 'apiid': i.api_id,
                    'end_date': i.end_date.strftime('%Y-%m-%d %H'), 'count': i.count, 'delay': delay,
                    'apiname': i.api.name, 'apiAddress': i.api.address}
            json.append(data)
        print(json)
        return json
    else:
        msg = 'no order'
        return {'userdata': msg}
