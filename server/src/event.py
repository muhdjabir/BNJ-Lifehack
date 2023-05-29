from flask import Blueprint, request
from .models import Event, format_event
from src import db

events = Blueprint('events', __name__)

@events.route("/", methods= ["GET"])
def hello():
    return 'Hello There'

@events.route("/api/event", methods = ["POST"])
def create_event():
    description = request.json['description']
    time = request.json['time']
    team_id = request.json['team_id']
    event = Event(description, time, team_id)
    db.session.add(event)
    db.session.commit()
    return format_event(event), 200

@events.route("/api/event", methods = ["GET"])
def get_events():
    events = Event.query.order_by(Event.id.asc()).all()
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    return {'events': event_list}, 200

@events.route("/api/event/<id>", methods = ["GET"])
def get_event(id):
    event = Event.query.filter_by(id = id).one()
    formatted_event = format_event(event)
    return { 'event': formatted_event}, 200

@events.route("/api/event/<id>", methods = ["DELETE"])
def delete_event(id):
    event = Event.query.filter_by(id = id).one()
    db.session.delete(event)
    db.session.commit()
    return f'Deleted Event (id: {event.id}, Item: {event.description})', 200

@events.route("/api/event/<id>", methods = ["PATCH"])
def update_event(id):
    event = Event.query.filter_by(id=id)
    time = request.json['time']
    event.update(dict(time = time))
    db.session.commit()
    return {'event': format_event(event.one())}, 200

@events.route("/api/event/items", methods = ["POST"])
def get_team_events():
    event_id = request.json["event"]
    print(event_id)
    events = Event.query.filter(Event.id.in_(event_id)).all()
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    return {'events': event_list}, 200