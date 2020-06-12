from flask import (Blueprint, redirect, render_template, request, url_for, flash)
from flask_login import (LoginManager, UserMixin, login_required, login_user, logout_user)
from flask_sqlalchemy import SQLAlchemy
from passlib.hash import pbkdf2_sha256
from models import User, db


login = Blueprint('login',__name__,
                  template_folder='templates')


login_manager = LoginManager()
login_manager.login_view = '/loginrequired'

@login.record_once
def on_load(state):
    login_manager.init_app(state.app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@login.route('/login', methods=['GET', 'POST'])
def Login():
    try:
        if request.method == 'POST':
            user = request.form['username']
            password = request.form['password']
            
            ### Get user from database
            user_from_db= User.query.filter_by(username=user).first()
                    
            ### Verify entered password
            hash_pswd = pbkdf2_sha256.verify(password, user_from_db.password)
            

            ### Login if password return True
            if hash_pswd==True:
                login_user(user_from_db, remember= request.form.get("remember"))
                return redirect('/')  
            else:
                flash('Wrong Password')
                return render_template("login.html")
        else:
            return render_template("login.html")
    
    ### If Wrong username:
    except AttributeError:
        flash("Wrong user name.")
        return render_template("login.html")

@login.route('/register', methods=['GET', 'POST'])
def Register():
    if request.method == 'POST':
        new_user= request.form['username']
        new_password = request.form['password']
        
        ### Hash password
        hash_pswd = pbkdf2_sha256.hash(new_password)
        
        ### Add to database
        new_user = User(username=new_user, password=hash_pswd)
        db.session.add(new_user)
        db.session.commit()
        return redirect('/')
    else:
        return render_template('register.html')
    
@login.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect("/")

@login.route('/logintest')
@login_required
def logintest():
    return render_template('logintest.html')

@login.route('/loginrequired')
def loginreq():
    return render_template('loginrequired.html')

@login.route('/forgotpassword', methods=['POST', 'GET'])
def changepassword():
    logout_user()
    if request.method == 'POST':
        user= request.form['username']
        new_password = request.form['password']
        
        ### Get user from database
        user_from_db= User.query.filter_by(username=user).first()
        
        ### Hash new password
        hash_pswd = pbkdf2_sha256.hash(new_password)
        
        ### Change password entry
        user_from_db.password = hash_pswd
        db.session.commit()
        return redirect('/login')
    else:
        return render_template('forgotpassword.html')
