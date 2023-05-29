from flask import Blueprint, request, jsonify
from .models import User, format_user
from flask_jwt_extended import create_access_token, get_jwt,get_jwt_identity, unset_jwt_cookies
from src import db

auth = Blueprint('auth', __name__)

@auth.route('/api/auth/register', methods = ['POST'])
def register():
    email = request.json['email'].lower()
    name = request.json['name']
    role = request.json['role']
    password = request.json['password']
    new_user = User(name, email, password, role)

    user = User.query.filter_by(email=email).first()
    if user:
        return {"error": "User already registered"}, 401
    
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=email)

    return {"user": format_user(new_user), "token":access_token}, 200

@auth.route('/api/auth/login', methods = ['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not user.check_password(password):
        return {"error": "User does not exist or password is wrong"}, 401# if the user doesn't exist or password is wrong, reload the page

    # if the above check passes, then we know the user has the right credentials
    access_token = create_access_token(identity=email)
    return {"user": format_user(user), "token":access_token}, 200

@auth.route('/api/auth/logout', methods = ['POST'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response, 200