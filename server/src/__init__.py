from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import timedelta
from dotenv import load_dotenv
from flask_login import LoginManager
from flask_jwt_extended import JWTManager

load_dotenv()
import os
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
POSTGRES_URI =  os.getenv("POSTGRES_URI")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = POSTGRES_URI
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=3)
jwt = JWTManager(app)
db = SQLAlchemy(app)
login = LoginManager(app)
CORS(app)

from .task import tasks
from .event import events
from .team import teams
from .user import users
from .auth import auths

app.register_blueprint(tasks)
app.register_blueprint(events)
app.register_blueprint(teams)
app.register_blueprint(users)
app.register_blueprint(auths)

from .models import User, Task, Event, Team

with app.app_context():
    db.create_all()