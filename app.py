#!usr/bin/env python3
from flask import Flask
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from models import db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cars.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] =False
app.json.compact = False

migrate=Migrate(app, db)

db.init_app(app)

bcrypt=Bcrypt(app)