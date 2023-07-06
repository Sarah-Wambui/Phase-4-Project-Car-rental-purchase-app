#!usr/bin/env python3
from flask import Flask, jsonify, make_response
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from models import db, Car, User, Review
from flask_restful import Api, Resource

app = Flask(__name__)
app.secret_key = b'\xa64\x16\xd5\x89\x14\xcd\x1b1\xcf\x82\x99$so'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cars.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] =False
app.json.compact = False

migrate=Migrate(app, db)

db.init_app(app)

# cars - get_cars, create_car, delete_car, update_car
# review - create_review, delete_review
# user - create_user, delete_user

api=Api(app)

class Index(Resource):
    def get(self):
        return f'<h1>Heading</h1>'
api.add_resource(Index, '/')

class Users(Resource):
    def get(self):
        pass

class Cars(Resource):
    def get(self):
        cars = []
        for car in Car.query.all():
            car_dict = car.to_dict()
            cars.append(car_dict)
        return make_response(cars, 200)
api.add_resource(Cars, '/cars')

if __name__ == "__main__":
    app.run(port=5555, debug=True)