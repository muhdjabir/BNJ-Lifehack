from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()
import os
POSTGRES_URI =  os.getenv("POSTGRES_URI")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = POSTGRES_URI
db = SQLAlchemy(app)
CORS(app)

from .task import tasks
from .event import events
from .team import teams
from .user import users

app.register_blueprint(tasks)
app.register_blueprint(events)
app.register_blueprint(teams)
app.register_blueprint(users)

from .models import User, Task, Event, Team

with app.app_context():
    db.create_all()