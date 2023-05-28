from flask import Blueprint, request
from .models import Task, format_task
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
def update_event(id):
    task = Task.query.filter_by(id=id)
    status = request.json['status']
    task.update(dict(status = status))
    db.session.commit()
    return {'task': format_task(task.one())}, 200

@tasks.route("/api/task/items", methods = ["GET"])
def get_team_tasks():
    task_id = request.json["task"]
    print(task_id)
    tasks = Task.query.filter(Task.id.in_(task_id)).all()
    task_list = []
    for task in tasks:
        task_list.append(format_task(task))
    return {'tasks': task_list}, 200