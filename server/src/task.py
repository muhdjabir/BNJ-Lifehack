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
    task = Task(description)
    db.session.add(task)
    db.session.commit()
    return format_task(task)

@tasks.route("/api/task", methods = ["GET"])
def get_tasks():
    tasks = Task.query.order_by(Task.id.asc()).all()
    task_list = []
    for task in tasks:
        task_list.append(format_task(task))
    return {'tasks': task_list}

@tasks.route("/api/task/<id>", methods = ["GET"])
def get_task(id):
    task = Task.query.filter_by(id = id).one()
    formatted_task = format_task(task)
    return { 'task': formatted_task}

@tasks.route("/api/task/<id>", methods = ["DELETE"])
def delete_task(id):
    task = Task.query.filter_by(id = id).one()
    db.session.delete(task)
    db.session.commit()
    return f'Task (id: {task.id}, Item: {task.description})'

@tasks.route("/api/task/<id>", methods = ["PATCH"])
def update_event(id):
    task = Task.query.filter_by(id=id)
    status = request.json['status']
    task.update(dict(status = status))
    db.session.commit()
    return {'task': format_task(task.one())}
