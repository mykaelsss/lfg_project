from flask_app import app
from flask import render_template, redirect, request,session
from flask_app.models.user import User


@app.route('/')
def dashboard():
    return render_template("dashboard.html")

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/login/user', methods=['POST'])
def login_user():
    if not User.valid_login(request.form):
        return redirect('/login')
    user = User.get_by_email(request.form)
    session['user_id'] = user.id
    session['username'] = user.username
    return redirect('/')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

@app.route('/register')
def register():
    return render_template("register.html")

@app.route('/register/user', methods=['POST'])
def user_register():
    if not User.valid_register(request.form):
        return redirect('/register')
    session['user_id'] = User.register_user(request.form)
    session['username'] = User.register_user(request.form)
    return redirect('/')

@app.route('/friends')
def friends():
    return render_template("friends.html")

@app.route('/settings')
def settings():
    return render_template("settings.html")
