#!usr/bin/env python3
from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Car, Review

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cars.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] =False
app.json.compact = False

migrate=Migrate(app, db)

db.init_app(app)


api=Api(app)

class Index(Resource):
    def get(self):
        return f"<h1>Welcome</h1>"
api.add_resource(Index, "/")

if __name__ == "__main__":
    app.run(port=5555, debug=True)