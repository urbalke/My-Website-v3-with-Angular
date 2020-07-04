import os

default_url = "/cloud"
default_cloud_folder = (os.getcwd() + "/userfiles")
sss = os.path.dirname('/home/patryk/anaconda3/envs/Angular-Flask/MyWebsite/userfiles/testFolder2/facebook-logo-480.jpg')
contents =[]
with os.scandir('/home/patryk/anaconda3/envs/Angular-Flask/MyWebsite/userfiles/testFolder2') as it:
    for entry in it:
        if not entry.name.startswith('.'):
            contents.append(entry.is_dir())
            
print(contents)
            