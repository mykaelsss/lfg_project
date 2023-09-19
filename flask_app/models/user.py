from flask_app.config.mysqlconnection import connectToMySQL
from itsdangerous import TimedSerializer
import re
from flask import flash
from flask_app import bcrypt, app
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
PASSWORD_REGEX = re.compile(r"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")


class User:
    db = "lfg_db"
    def __init__(self,data):
        self.id = data['id']
        self.username = data['username']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']


    @classmethod
    def register_user(cls, data):
        query = "INSERT INTO users (username, email, password) VALUES (%(username)s, %(email)s,%(password)s);"
        data = {
            **data,
            "password":bcrypt.generate_password_hash(data['password']).decode('utf-8')
        }
        return connectToMySQL(cls.db).query_db(query,data)

    @classmethod
    def updatePassword(cls, data):
        query = "UPDATE users SET password = %(password)s WHERE email = %(email)s;"
        data = {
            **data,
            "password":bcrypt.generate_password_hash(data['password']).decode('utf-8')
        }
        return connectToMySQL(cls.db).query_db(query,data)

    @classmethod
    def get_by_id(cls, data):
        query = "SELECT * FROM users WHERE id = %(id)s; "
        results =connectToMySQL(cls.db).query_db(query,data)
        if results:
            return cls(results[0])

    @classmethod
    def get_by_email(cls, data):
        query = "SELECT * FROM users WHERE email = %(email)s; "
        results = connectToMySQL(cls.db).query_db(query,data)
        if results:
            return cls(results[0])

    @classmethod
    def get_by_username(cls, data):
        query = "SELECT * FROM users WHERE username= %(username)s; "
        results =connectToMySQL(cls.db).query_db(query,data)
        if results:
            return cls(results[0])

    @staticmethod
    def valid_register(user):
        is_valid = True
        if len(user['username']) < 3:
            flash("Username must be at least 3 characters long.", 'register')
            is_valid = False
        if User.get_by_username(user):
            flash("Username already in use.", 'register')
            is_valid = False
        if not EMAIL_REGEX.match(user['email']):
            flash("Invalid Email!", 'register')
            is_valid = False
        if User.get_by_email(user):
            flash("Email already in use.", 'register')
            is_valid = False
        if not PASSWORD_REGEX.match(user['password']):
            flash("Password must be at least 8 characters long, contain one capital letter, one number and a special character.", 'register')
            is_valid = False
        if user['password'] != user['confirm_password']:
            flash("Password and confirm password must match.", 'register')
            is_valid = False
        return is_valid

    def get_token(user):
        serial = TimedSerializer(app.config['SECRET_KEY'])
        return serial.dumps({'user_id': user.id, 'email': user.email})

    @staticmethod
    def confirm_token(token):
        serializer = TimedSerializer(app.config['SECRET_KEY'])
        try:
            user_info = serializer.loads(token, max_age=600)
        except:
            return None
        return user_info

    @staticmethod
    def valid_user(user):
        is_valid = True
        if User.get_by_email(user):
            flash("Reset request sent, please check your email.", 'resetRequest')
            is_valid = False
        if not User.get_by_email(user):
            flash("This email is not registered.", 'resetRequest')
            is_valid = False
        return is_valid

    @staticmethod
    def validPasswordReset(user):
        is_valid = True
        if not PASSWORD_REGEX.match(user['password']):
            flash("Password must be at least 8 characters long, contain one capital letter, one number and a special character.", 'pwReset')
            is_valid = False
        if user['password'] != user['confirm_password']:
            flash("Password and confirm password must match.", 'pwReset')
            is_valid = False
        if PASSWORD_REGEX.match(user['password']) and user['password'] == user['confirm_password']:
            flash('Password successfully updated.', 'pwReset')
        return is_valid


    @staticmethod
    def valid_login(data):
        user = User.get_by_email(data)
        if not user:
            flash("Invalid Login", 'login')
            return False
        if not bcrypt.check_password_hash(user.password, data['password']):
            flash("Invalid Login", 'login')
            return False
        return True
