import datetime

from ..models import Developer, APIorder, Record, User


def check_auth(apiname, username, password, content):
    if Developer.objects.filter(user__username=username, user__password=password):
        if APIorder.objects.filter(dev__user__username=username, api__name=apiname):
            apiorder = APIorder.objects.get(dev__user__username=username, api__name=apiname)
            if datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") < apiorder.end_date.strftime("%Y-%m-%d %H:%M:%S"):
                err = "authed"
                apiorder.count = apiorder.count + 1
                apiorder.save()
                new_rec = Record(apiorder=apiorder, datetime=datetime.datetime.now(), content=content)
                new_rec.save()
            else:
                err = "order out of date"
        else:
            err = "order not exist"
    else:
        err = "developer not exist or password not right"

    return err


def not_auth(content):
    err = "authed"
    new_rec = Record(datetime=datetime.datetime.now(), content=content)
    new_rec.save()
    return err
