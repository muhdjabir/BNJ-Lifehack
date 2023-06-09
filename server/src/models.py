from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from werkzeug.security import generate_password_hash, check_password_hash
from src import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable = False)
    email = db.Column(db.String(), nullable = False, unique = True)
    password_hash = db.Column(db.String(), nullable = False)
    role = db.Column(db.String(), nullable = False)
    team_id = db.Column(ARRAY(db.Integer), server_default= "{}")
    task_id = db.Column(ARRAY(db.Integer), server_default= "{}")
    points = db.Column(db.Integer, nullable = False, default = 0)

    def __repr__(self):
        return f'User: {self.id} {self.name} {self.role}'
    
    def __init__(self, name, email, password, role):
        self.name = name
        self.email = email
        self.password_hash = generate_password_hash(password)
        self.role = role
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

def format_user(user):
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "role": user.role,
        "team_id": user.team_id,
        "task_id": user.task_id,
        "points": user.points
    }

class Task(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(), nullable = False)
    priority = db.Column(db.String(), nullable = False)
    status = db.Column(db.String(), nullable = False, default = "Open")

    def __repr__(self):
        return f'Task ID: {self.id} Description: {self.description} Status: {self.status}'
    
    def __init__(self, description, priority):
        self.description = description
        self.priority = priority

def format_task(task):
    return { 
        "id": task.id,
        "description": task.description,
        "status": task.status,
        "priority": task.priority
    }

class Team(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable = False)
    description = db.Column(db.String(), nullable = False)
    manager_id = db.Column(db.Integer, nullable = False)
    members_id = db.Column(ARRAY(db.Integer), server_default= "{}", nullable = False)
    events_id = db.Column(ARRAY(db.Integer), server_default= "{}")

    def __repr__(self):
        return f'ID: {self.id} Name: {self.name} Description: {self.description}'

    def __init__(self, name, description, manager_id):
        self.name = name
        self.description = description
        self.manager_id = manager_id

def format_team(team):
    return {
        "id": team.id,
        "name": team.name,
        "description": team.description,
        "manager_id": team.manager_id,
        "members_id": team.members_id,
        "events_id": team.events_id
    }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(), nullable = False)
    time = db.Column(db.DateTime, nullable = False)
    team_id = db.Column(db.Integer, nullable = False)

    def __repr__(self):
        return f'ID: {self.id} Description: {self.description} Time: {self.time} Team: {self.team_id}'
    
    def __init__(self, description, time, team_id):
        self.description = description
        self.time = time
        self.team_id = team_id

def format_event(event):
    return {
        "id": event.id,
        "description": event.description,
        "team_id": event.team_id,
        "time": event.time
    }