from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from datetime import datetime, timedelta



class Post:
    db = "lfg_db"
    def __init__(self,data):
        self.id = data['id']
        self.title = data['title']
        self.content = data['content']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.user_id = data['user_id']
        self.game_id = data['game_id']


    @classmethod
    def create_post(cls,data):
        query = "INSERT INTO posts (title, content, user_id, game_id) VALUES (%(title)s, %(content)s, %(user_id)s, %(game_id)s)"
        return connectToMySQL(cls.db).query_db(query,data)

    @classmethod
    def all_posts(cls):
        query = "SELECT * FROM posts WHERE game_id = 1"
        results = connectToMySQL(cls.db).query_db(query)
        posts = []
        for post in results:
            posts.append(cls(post))
        return posts

    @classmethod
    def deletePost(cls,data):
        query = "DELETE FROM posts WHERE id = %(id)s"
        return connectToMySQL(cls.db).query_db(query,data)

    @classmethod
    def editPost(cls,data):
        query = "UPDATE posts SET title = %(title)s, content = %(content)s WHERE id = %(id)s"
        return connectToMySQL(cls.db).query_db(query,data)

    @staticmethod
    def validate_post(post):
        is_valid = True
        if len(post['title']) < 5:
            flash("The title must be at least 5 characters.", 'post_form')
            is_valid = False
        if len(post['content']) < 10:
            flash("Content must be at least 10 characters.", 'post_form')
            is_valid = False
        return is_valid

    @staticmethod
    def validateEdit(post):
        is_valid = True
        if (len(post['title'])) < 5:
            flash("The title must be at least 5 characters.", 'post_form')
            is_valid = False
        if (len(post['content'])) < 10:
            flash("Content must be at least 10 characters.", 'post_form')
            is_valid = False
        return is_valid
