from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.models import post




class Game:
    db = "lfg_db"
    def __init__(self,data):
        self.id = data['id']
        self.title = data['title']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.game_posts = []

    @classmethod
    def all_games(cls):
        query = "SELECT * FROM games"
        results = connectToMySQL(cls.db).query_db(query)
        games = []
        for game in results:
            games.append(cls(game))
        return games


    @classmethod
    def get_game_id(cls,data):
        query = "SELECT * FROM games WHERE id = %(id)s"
        return connectToMySQL(cls.db).query_db(query,data)


    @classmethod
    def get_game_title(cls,data):
        query = "SELECT * FROM games WHERE title = %(title)s"
        return connectToMySQL(cls.db).query_db(query,data)

    @classmethod
    def game_posts(cls, data):
        query = "SELECT * FROM posts LEFT JOIN users ON users.id = posts.user_id LEFT JOIN games ON games.id = posts.game_id"
        results = connectToMySQL(cls.db).query_db(query, data)
        posts = []
        for row in results:
            post = cls(row)
            post_data ={
                "id": row['posts.id'],
                "title": row['title'],
                "content":row['content'],
                "created_at":row ['posts.created_at'],
                "updated_at": row['users.updated_at']
            }
            posts.game_posts.append( post.Post(post_data))
        return posts
