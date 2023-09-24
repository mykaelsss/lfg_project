from flask_app import app
from flask import render_template, redirect, request,session
from flask_app.models.post import Post
from flask_app.models.game import Game


@app.route('/create/post', methods = ['POST'])
def create_post():
    data = {
        "title" : request.form['title'],
        "content" : request.form['content'],
        "user_id" : session['user_id'],
        "game_id" : request.form['game_id']
        }
    if not Post.validate_post(data):
        return redirect(request.referrer)
    Post.create_post(data)
    return redirect(request.referrer)

@app.route('/delete/post/<int:id>')
def deletePost(id):
    data = { "id" : id }
    Post.deletePost(data)
    return redirect(request.referrer)

@app.route('/edit/post/<int:id>', methods=['POST'])
def editPost(id):
    data = {
        "title" : request.form['title'],
        "content" : request.form['content'],
        "user_id" : session['user_id'],
        "game_id" : request.form['game_id'],
        "id" : id
    }
    print(data['id'], data['user_id'])
    if not Post.validateEdit(data):
        return redirect(request.referrer)
    Post.editPost(data)
    return redirect(request.referrer)
