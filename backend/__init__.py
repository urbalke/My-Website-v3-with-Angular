from flask import (Flask, redirect, render_template, request, url_for, Blueprint)
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_restful import Api
from flask_cors import CORS
from werkzeug.utils import secure_filename
from config import *

from home.home import home
from login_project.login import login
from blog_project.blog import blog
from api_project.api_bp import api_bp
from models import db, User, Blog
from cloud_project.cloud import piccolo

app = Flask(__name__)
CORS(app)
app.config.from_object('config.Config')
db = SQLAlchemy(app)


app.register_blueprint(home)
app.register_blueprint(login)
app.register_blueprint(blog)
app.register_blueprint(api_bp)
app.register_blueprint(piccolo)

if __name__== "__main__":
    app.run(debug=True)
