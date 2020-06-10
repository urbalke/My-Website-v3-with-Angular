from flask import Flask, Blueprint, render_template, request, redirect, json, jsonify, Response
from flask_restful import Api, Resource, reqparse, fields, marshal_with, marshal
import requests
from bs4 import BeautifulSoup  

api_bp = Blueprint('api_bp', __name__,
               template_folder='templates')

api = Api(api_bp)

parser = reqparse.RequestParser()  
parser.add_argument('base_url')
parser.add_argument('pages')

aukcje_model = {
    "auctions": fields.Raw(default="Check base_url, probably wrong")    
}

class WebScrap:   ### My old Script adapted to do the job
    
    def Scraping(base_url, pages): 
        auctions_scrapped = []
        
        if pages == 1:
            page = requests.get(base_url)
            soup = BeautifulSoup(page.content, 'html.parser')
            artykuly = soup.find_all('article')
            for i in range(61):
                try:
                    artykul = artykuly[i]
                    tytuly = artykul.h2.extract()
                    ceny = artykul.find("span", class_='_9c44d_1zemI')
                    osoby = artykul.find("span", class_="_9c44d_2o04k")
                    lista = (tytuly.get_text(), ceny.get_text(), osoby.get_text())                    
                    auctions_scrapped.append(lista)
                except AttributeError:
                    break
            return auctions_scrapped
        else:       
            for q in range(1, int(pages)):     
                try:
                    page = requests.get(base_url + "&p=" + str(q))
                    soup = BeautifulSoup(page.content, 'html.parser')
                    artykuly = soup.find_all('article')
                    
                    for i in range(61):
                        try:
                            artykul = artykuly[i]
                            tytuly = artykul.h2.extract()
                            ceny = artykul.find("span", class_='_9c44d_1zemI')
                            osoby = artykul.find("span", class_="_9c44d_2o04k")
                            lista = (tytuly.get_text(), ceny.get_text(), osoby.get_text())                    
                            auctions_scrapped.append(lista)
                        except AttributeError:
                            break               
                except:
                    break       
            return auctions_scrapped 


@api_bp.route('/api', methods=['GET', 'POST'])
def ApiHomePage():
        return render_template('api.html')

@api_bp.route('/api/sallegro', methods=['GET', 'POST'])
def SendData():
    if request.method == 'POST':
        return redirect('/api/sallegro/contents')
    else:
        redirect("/api")
        
@api_bp.route('/api/sallegro/contents', methods=['GET', 'POST'])
def RequestConetents():
    if request.method == 'POST':
        base_url = str(request.form.get('base_url'))
        pages = int(request.form.get('pages'))
        contents = WebScrap.Scraping(base_url,pages)
        js =  { "auctions" : contents} 
    return Response(json.dumps(js), mimetype='application/json') 
        
class Allegro(Resource):
    @marshal_with(aukcje_model)   
    def post(self):
        args = parser.parse_args()
        base_url = args.base_url
        pages = int(args.pages)

        return { "auctions": WebScrap.Scraping(base_url,pages)}
    
api.add_resource(Allegro, "/api/allegro")
    
    