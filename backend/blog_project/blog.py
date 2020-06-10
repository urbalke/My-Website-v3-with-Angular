from flask import (Blueprint, redirect, render_template, request, url_for, flash)
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from models import Blog, db
from flask_restful import Api, Resource, reqparse, fields, marshal_with, marshal

blog = Blueprint('blog', __name__,
                 template_folder='templates')

blogApi = Api(blog)

parser = reqparse.RequestParser()
parser.add_argument('id')
parser.add_argument('title')
parser.add_argument('content')
parser.add_argument('author')
parser.add_argument('date_posted')


blog_model = {
    "id": fields.String,
    "title": fields.String,
    "author": fields.String,
    "content": fields.String,
    "date_posted": fields.String,
}

class BlogBack(Resource):
    @marshal_with(blog_model)
    
    def get(self): 
        args = parser.parse_args()
        post_id = args['id']
        if post_id == None:
            all_posts = Blog.query.all()
            return all_posts
        else:
            post = Blog.query.get(post_id)
            return post
    
    def post(self):
        args = parser.parse_args()
        post_title = args['title']
        post_author = args['author']
        post_content = args['content']
        
        new_post = Blog(title=post_title, content=post_content, author=post_author)
        db.session.add(new_post)
        db.session.commit()
        return "ok"
    
    def delete(self):
        args = parser.parse_args()
        post_id = args['id']
        
        post = Blog.query.get_or_404(post_id)
        db.session.delete(post)
        db.session.commit()
        return post_id
    
class BlogSpecPost(Resource):
    @marshal_with(blog_model)
    
    def get(self, id):
        return "ok"
    
    
    
blogApi.add_resource(BlogBack, "/blog/api")
blogApi.add_resource(BlogSpecPost, "/blog/api/<int:id>")



@blog.route('/blog')
def index():
    return render_template('blog.html')

@blog.route('/posts', methods=['GET', 'POST'])
def posts():

    if request.method == 'POST': 
        post_title = request.form['title']
        post_content = request.form['content']
        post_author = request.form['author']
        new_post = Blog(title=post_title, content=post_content, author=post_author)
        db.session.add(new_post)
        db.session.commit()
        return redirect('/posts')
    else:
        all_posts = reversed(Blog.query.order_by(Blog.date_posted).all()) ### Reverse data display
        return render_template('posts.html', posts=all_posts)

@blog.route('/blog/posts/delete/<int:id>')
def delete(id):
    post = Blog.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return redirect('/posts')

@blog.route('/blog/posts/edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    
    post = Blog.query.get_or_404(id)

    if request.method == 'POST':
        post.title = request.form['title']
        post.author = request.form['author']
        post.content = request.form['content']
        db.session.commit()
        return redirect('/posts')
    else:
        return render_template('edit.html', post=post)

@blog.route('/blog/posts/new', methods=['GET', 'POST'])
def new_post():
    return render_template('new_post.html')
