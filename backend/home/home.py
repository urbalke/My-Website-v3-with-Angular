from flask import Blueprint, render_template

home = Blueprint('home', __name__,
                 template_folder='templates')

@home.route('/')
def index():
    return render_template('index.html')

@home.route('/about') 
def test():
    return render_template('about.html')