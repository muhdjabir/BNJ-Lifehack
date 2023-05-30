from flask import Blueprint, request
from .models import Task, format_task, User, format_user
from sqlalchemy.dialects.postgresql import ARRAY
from src import db

tasks = Blueprint('tasks', __name__)

@tasks.route("/", methods= ["GET"])
def hello():
    return 'Hello There'

@tasks.route("/api/task", methods = ["POST"])
def create_task():
    description = request.json['description']
    priority = request.json['priority']
    task = Task(description, priority)
    db.session.add(task)
    db.session.commit()
    return format_task(task), 200

@tasks.route("/api/task", methods = ["GET"])
def get_tasks():
    tasks = Task.query.order_by(Task.id.asc()).all()
    task_list = []
    for task in tasks:
        task_list.append(format_task(task))
    return {'tasks': task_list}, 200

@tasks.route("/api/task/pending", methods = ["GET"])
def get_pending_tasks():
    tasks = Task.query.filter_by(status = "Pending").all()
    task_list = []
    for task in tasks:
        task_list.append(format_task(task))
    return {'tasks': task_list}, 200

@tasks.route("/api/task/open", methods = ["GET"])
def get_open_tasks():
    tasks = Task.query.filter_by(status = "Open").all()
    task_list = []
    for task in tasks:
        task_list.append(format_task(task))
    return {'tasks': task_list}, 200

@tasks.route("/api/task/completed", methods = ["GET"])
def get_tasks():
    tasks = Task.query.filter_by(status = "Completed").all()
    task_list = []
    for task in tasks:
        task_list.append(format_task(task))
    return {'tasks': task_list}, 200

@tasks.route("/api/task/<id>", methods = ["GET"])
def get_task(id):
    task = Task.query.filter_by(id = id).one()
    formatted_task = format_task(task)
    return { 'task': formatted_task}, 200

@tasks.route("/api/task/<id>", methods = ["DELETE"])
def delete_task(id):
    task = Task.query.filter_by(id = id).one()
    db.session.delete(task)
    db.session.commit()
    return f'Deleted Task (id: {task.id}, Item: {task.description})', 200

@tasks.route("/api/task/<id>", methods = ["PATCH"])
def update_task(id):
    task = Task.query.filter_by(id=id)
    status = request.json['status']
    priority = task[0].priority
    current_user = User.query.filter(User.task_id.contains([task[0].id])) # FIX THIS
    task.update(dict(status = status))
    if status == "Completed":
        current_points = current_user[0].points
        points_gained = 0
        match (priority):
            case "Low":
                points_gained = 1
            case "Medium":
                points_gained = 3
            case "High":
                points_gained = 5
        final_points = points_gained + current_points
        current_user.update(dict(points = final_points))

    db.session.commit()
    # return {'task': format_task(task[0])}
    return {'task': format_task(task.one()), "user": format_user(current_user.one())}, 200

@tasks.route("/api/task/items", methods = ["POST"])
def get_team_tasks():
    task_id = request.json["task"]
    print(task_id)
    tasks = Task.query.filter(Task.id.in_(task_id)).all()
    task_list = []
    for task in tasks:
        task_list.append(format_task(task))
    return {'tasks': task_list}, 200