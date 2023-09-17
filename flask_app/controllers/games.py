from flask_app import app
from flask import render_template, redirect, request,session
from flask_app.models.game import Game
from flask_app.models.post import Post
from bleach import clean




@app.route('/games')
def games():
    return render_template("games.html", all_games = Game.all_games())

@app.route('/games/<int:id>')
def one_game(id):
    data = {
        "id": id,
        # "title": ['title'],
        "content" : ['content'],
    }
    return render_template("one-game.html", game = Game.get_game_id(data), posts = Game.all_game_posts(data))
