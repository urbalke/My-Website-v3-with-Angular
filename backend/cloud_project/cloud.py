from flask import (Blueprint, redirect, render_template, request, url_for, flash, send_from_directory)
from config import *
import os
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename


piccolo = Blueprint('piccolo',__name__,
                  template_folder='templates')


default_url = "/cloud"
default_cloud_folder= (os.getcwd()+ "/userfiles")


@piccolo.route(default_url+"/<path>", methods=["GET", "POST"])
def navigate(path):
    if request.method == 'POST':
        cloud_contents = os.listdir(default_cloud_folder + "/" + path)
        return render_template('cloud.html')
    else:
        cloud_contents = os.listdir(default_cloud_folder + "/" + path)
        return render_template('cloud.html', cloud_contents=cloud_contents)



@piccolo.route(default_url, methods=["GET", "POST"])    
def upload():
    if request.method == 'POST':
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect("/cloud")
        else:
            filename = secure_filename(file.filename)
            file.save(os.path.join(default_cloud_folder, filename))
            return redirect("/cloud")
    else:
        cloud_contents = os.listdir(default_cloud_folder + "/") 
        return render_template('cloud.html', cloud_contents=cloud_contents)
    
@piccolo.route('/cloud/delete/<cloud_contents>', methods=["GET", "POST"])
def delete_file(cloud_contents):
    os.remove(default_cloud_folder + "/" + cloud_contents) 
    return redirect('/cloud')


@piccolo.route('/cloud/download/<cloud_contents>', methods=["GET", "POST"])
def download(cloud_contents):
    return send_from_directory(default_cloud_folder, cloud_contents, as_attachment=True) 