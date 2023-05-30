# WorkBliss
Created by BNJ
- Muhammad Jabir
- Nuzzul Haqim
- Brian Huang
## Chosen Theme
### Revolutionizing the Workplace 
Problem Statement: A mundane career can be both fulfilling and exciting in a virtual and innovative workplace setting. Design an application which allows employees to seek joy in their work and offers practical benefits.

## Our Motivation
Working professionally can be seen as a all work and no play environment. Consequently, this can lead to diminished morale and an unexciting working experience. With the growth of technology and concepts of gameification, we have come up with WorkBliss, to inject some fun and play into work that incentivises an organisation's workforce 

## What is WorkBliss
WorkBliss in essence is a workflow application that allows users to join and make teams for respective projects in their organisation, create events, coordinate tasks/tickets and view benefits and resources provided by the organisation.

## Core Features
WorkBliss has a distinction between managers and employers. Managers grant admin privileges for such users to create new teams, events, tasks and add players.

### Task Gameification
Managers are able to post new tasks or tickets and determine the priority of these tasks.
After which, other users are able to take up these tasks. Upon completion of these tasks, they will receive certain amount of points depending on the priority of the task which will reflect in the tally displayed on the dashboard
Priority
- Low: 1 Point
- Medium: 3 Points
- High: 5 Points

### Team Building
Managers are able to create new teams, add events and members to these teams.
The teams page act as a resource for users to view all their teams, corresponding events and details of other members pertaining to their team.

### Resources
On the resource page, users are able to view all the resources and incentives posted by their organisation
## Tech Stack
|Component|Choice|
|-----|-----|
|Frontend|ReactJS|
|Backend|Flask|
|Database|PostgreSQL|
|UI Library|MaterialUI|

## Dependencies Required
- PostgreSQL DB PG Admin4
- Python pipenv
- ENV Files for flask backend

From root directory
```sh
cd server
```

Create an .env file in /server
```sh
POSTGRES_URI="postgresql://<admin>:<password>@localhost/lifehack"
JWT_SECRET_KEY="mysecretkey"
```

Create a .flaskenv file in /server
```sh
FLASK_APP=app
FLASK_ENV=development
```
## Running our Application
To run our application you need to open 2 terminals. Commands assume starting from root directory.



Flask Backend
```sh
cd server
pipenv shell
flask run
```

React Frontend
```sh
cd client
npm start
```

