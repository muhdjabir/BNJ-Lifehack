from flask import Blueprint, request
from .models import Team, format_team
from src import db

teams = Blueprint('teams', __name__)

@teams.route("/", methods= ["GET"])
def hello():
    return 'Hello There'

@teams.route("/api/team", methods = ["POST"])
def create_team():
    name = request.json["name"]
    description = request.json['description']
    manager_id = request.json['manager_id']
    team = Team(name, description, manager_id)
    db.session.add(team)
    db.session.commit()
    return format_team(team), 200

@teams.route("/api/team", methods = ["GET"])
def get_teams():
    teams = Team.query.order_by(Team.id.asc()).all()
    team_list = []
    for team in teams:
        team_list.append(format_team(team))
    return {'teams': team_list}, 200

@teams.route("/api/team/<id>", methods = ["GET"])
def get_team(id):
    team = Team.query.filter_by(id = id).one()
    formatted_team = format_team(team)
    return { 'team': formatted_team}, 200

@teams.route("/api/team/<id>", methods = ["DELETE"])
def delete_team(id):
    team = Team.query.filter_by(id = id).one()
    db.session.delete(team)
    db.session.commit()
    return f'Deleted Team (id: {team.id}, Item: {team.description})', 200

@teams.route("/api/team/<id>", methods = ["PATCH"])
def add_member(id):
    # Update team members and user teams ################################ remember to add member update function
    team = Team.query.filter_by(id=id)
    members_id = request.json['members_id']
    temp_array = team[0].members_id
    temp_array.append(members_id)
    team.update(dict(members_id = temp_array))
    db.session.commit()
    # return {'team': temp_array}
    return {'team': format_team(team.one())}, 200

@teams.route("/api/team/items", methods = ["GET"])
def get_team_teams():
    team_id = request.json["team"]
    print(team_id)
    teams = Team.query.filter(Team.id.in_(team_id)).all()
    team_list = []
    for team in teams:
        team_list.append(format_team(team))
    return {'teams': team_list}, 200