import os

default_url = "/cloud"
default_cloud_folder = (os.getcwd() + "/userfiles")

contents =[]
with os.scandir('/home/patryk/anaconda3/envs/Angular-Flask/MyWebsite/userfiles') as it:
    for entry in it:
        if not entry.name.startswith('.'):
            contents.append(entry.name)
            
print(contents)
            