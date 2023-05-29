from flask import Blueprint, request
from .models import User, format_user
from src import db

users = Blueprint('users', __name__)

@users.route("/", methods= ["GET"])
def hello():
    return 'Hello There'

@users.route("/api/user", methods = ["POST"])
# def create_user():
#     name = request.json["name"]
#     email = request.json['email']
#     role = request.json['role']
#     user = User(name, email, role)
#     db.session.add(user)
#     db.session.commit()
#     return format_user(user), 200

@users.route("/api/user", methods = ["GET"])
def get_users():
    users = User.query.order_by(User.id.asc()).all()
    user_list = []
    for user in users:
        user_list.append(format_user(user))
    return {'users': user_list}, 200

@users.route("/api/user/<id>", methods = ["GET"])
def get_user(id):
    user = User.query.filter_by(id = id).one()
    formatted_user = format_user(user)
    return { 'user': formatted_user}, 200

@users.route("/api/user/<id>", methods = ["DELETE"])
def delete_user(id):
    user = User.query.filter_by(id = id).one()
    db.session.delete(user)
    db.session.commit()
    return f'Deleted user (id: {user.id}, Item: {user.description})', 200

@users.route("/api/user/<id>", methods = ["PATCH"])
def add_task(id):
    # Update user members and user users ################################ remember to add member update function
    user = User.query.filter_by(id=id)
    task_id = request.json['task_id']
    temp_array = user[0].task_id
    temp_array.append(task_id)
    user.update(dict(task_id = temp_array))
    db.session.commit()
    # return {'user': temp_array}
    return {'user': format_user(user.one())}, 200

@users.route("/api/user/items", methods = ["GET"])
def get_user_users():
    user_id = request.json["user"]
    users = User.query.filter(user.id.in_(user_id)).all()
    user_list = []
    for user in users:
        user_list.append(format_user(user))
    return {'users': user_list}, 200