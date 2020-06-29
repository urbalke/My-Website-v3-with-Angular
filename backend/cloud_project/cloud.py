from flask import (Blueprint, redirect, render_template,
                   request, url_for, flash, send_from_directory, jsonify)
from config import *
import os
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
from flask_restful import Api, Resource, reqparse, fields, marshal_with, marshal
from pathlib import Path


piccolo = Blueprint('piccolo', __name__,
                    template_folder='templates')


default_url = "/cloud"
default_cloud_folder = (os.getcwd() + "/userfiles")


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


######################### API ############################
cloudApi = Api(piccolo)

parser = reqparse.RequestParser()
parser.add_argument('fileName')
parser.add_argument('isDir')
parser.add_argument('command')
parser.add_argument('filePath')


response_model = {
    "fileName": fields.String,
    "isDir": fields.String,
    "filePath": fields.String,
    
}


class CloudObtain(Resource):
    @marshal_with(response_model)
    def post(self):
        args = parser.parse_args()

        fileName = args['fileName']
        isDir = args['isDir']
        filePath = args['filePath']
        command = args['command']

        if filePath == 'root' and command == None:
            contents = []
            with os.scandir('/home/patryk/anaconda3/envs/Angular-Flask/MyWebsite/userfiles') as it:
                for entry in it:
                    if not entry.name.startswith('.'):
                        contents.append({
                            "fileName": entry.name,
                            "isDir": entry.is_dir(),
                            "filePath": entry.path,
                        })
            return  contents
        elif command == 'navUp' and (isDir == 'true' or 'True'): 
            contents = []
            with os.scandir(filePath) as it:
                for entry in it:
                    contents.append({
                            "fileName": entry.name,
                            "fileType": entry.is_dir(),
                            "filePath": entry.path,
                        })
            
            return contents #{"fileName": "test"}
        elif command == 'navDown':
            contents = []
            path = Path(str(filePath))
            with os.scandir(path.parent.parent) as it:
                for entry in it:
                    contents.append({
                            "fileName": entry.name,
                            "fileType": entry.is_dir(),
                            "filePath": entry.path,
                        })
            
            return contents
        elif command == 'download':
            return "file"
        else:
            return "DUNNO WHAT TO DO"


cloudApi.add_resource(CloudObtain, '/cloud/obtain')