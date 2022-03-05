class Router(object):
    def db_for_read(self, model, **hints):
        import random
        return random.choice(["slave", "slave3", "slave4","slave5"])

    def db_for_write(self, model, **hints):
        return "default"

    def allow_relation(self, model1, model2, **hints):
        return True

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db != 'default':
            return None
        else:
            return True
