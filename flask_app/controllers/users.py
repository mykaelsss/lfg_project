from flask_app import app, mail
from flask import render_template, redirect, request,session, url_for, request,flash
from flask_app.models.user import User
from flask_mail import Message

@app.route('/')
def dashboard():
    data={
        "id": id
    }
    return render_template("dashboard.html", user = User.get_by_id(data))

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
    session['username'] = request.form['username']
    return redirect('/')


@app.route('/update/password/<token>', methods = ['GET'])
def reset_token(token):
    user = User.confirm_token(token)
    email = request.args.get('email')
    print('user',user)
    if user is None:
        return redirect('/forgot')
    return render_template('changePassword.html', email = email)

@app.route('/reset/password', methods = ['POST'])
def reset_password():
    if not User.validPasswordReset(request.form):
        print("invalid")
        return redirect('/update/password/<token>')
    print("success")
    User.updatePassword(request.form)
    return redirect('/login')

@app.route('/forgot')
def forgotPassword():
    return render_template("forgotPassword.html")

@app.route('/forgot/user', methods=['POST'])
def validUser():
    if not User.valid_user(request.form):
        return redirect('/forgot')
    user = User.get_by_email(request.form)
    sendMail(user)
    return redirect('/forgot')

def sendMail(user):
    token = User.get_token(user)
    email = user.email
    reset_url = url_for('reset_token', token=token, email=email, _external=True)
    msg = Message('Password Reset Request', recipients=[user.email], sender='noreply@mykaelsicard04@gmail.com')
    msg.body = f''' To reset your password, please follow the link below.

    {reset_url}

    If you didn't send a password reset request. Please ignore this message.

    '''
    mail.send(msg)
