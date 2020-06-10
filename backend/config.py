from datetime import timedelta
import datetime

class Config(object):
    
    
    SECRET_KEY = 'bH\xf3\xd2\xaax\x8d\xd1n\xd8)\xb1\xb2J\x98\xda\xae\xf0\xe0\x08\xf4\xafs\xe2\xf9'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///login_project/login.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    REMEMBER_COOKIE_DURATION = datetime.timedelta(minutes=10)
    SQLALCHEMY_BINDS = {
        "db2" : 'sqlite:///blog_project/blog.db'
    }
    