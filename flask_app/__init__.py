from flask import Flask
from flask_bcrypt import Bcrypt
from flask_mail import Mail
app = Flask(__name__)
app.config['SECRET_KEY'] = 'thisisasupersecretkeypleasedontsearchforit'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'mykaelsicard04@gmail.com'
app.config['MAIL_PASSWORD'] = 'agcy ybrs stxm bgti'
mail = Mail(app)
bcrypt = Bcrypt(app)
