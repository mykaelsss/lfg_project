from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.models.post import Post




class Game:
    db = "lfg_db"
    def __init__(self,data):
        self.id = data['id']
        self.title = data['title']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.game_posts = [ ]

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
    def all_game_posts(cls, data):
        query = "SELECT * FROM posts LEFT JOIN users ON users.id = posts.user_id LEFT JOIN games ON games.id = posts.game_id WHERE game_id = %(id)s ORDER BY posts.id DESC"
        results = connectToMySQL(cls.db).query_db(query, data)
        posts = []
        for row in results:
            post_data ={
                "id": row['id'],
                "title": row['title'],
                "content": row['content'],
                "game_id": row['game_id'],
                "user_id": row['user_id'],
                "username": row['username'],
                "created_at": row ['created_at'],
                "updated_at": row['updated_at']
            }
            posts.append(row)
        return posts
