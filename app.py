#!usr/bin/env python3
from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Car, Review
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = b'\xa64\x16\xd5\x89\x14\xcd\x1b1\xcf\x82\x99$so'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cars.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] =False
app.json.compact = False
CORS(app)

migrate=Migrate(app, db)

db.init_app(app)

api=Api(app)

class Index(Resource):
    def get(self):
        return f'Welcome to Car/User/Review API'
api.add_resource(Index, '/')

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify({"users": users}), 200)
api.add_resource(Users, "/users")

class Cars(Resource):
    def get(self):
        cars = [car.to_dict() for car in Car.query.all()]
        return make_response(jsonify({"cars": cars}), 200)
    
    def post(self):
        new_car=Car(
            name = request.form["name"],
            color = request.form["color"],
            year=request.form["year"],
            engine=request.form["engine"],
            mileage=request.form["mileage"],
            category=request.form["category"]
        )
        db.session.add(new_car)
        db.session.commit()
        return make_response(jsonify(new_car.to_dict()), 201)
api.add_resource(Cars, '/cars')

class CarByID(Resource):
    def patch(self, id):
        car = Car.query.filter_by(id = id).first()
        for attr in request.form:
            setattr(car, attr, request.form[attr])
        db.session.add(car)
        db.session.commit()
        return make_response(jsonify(car.to_dict()), 200)

    def delete(self, id):
        car = Car.query.filter_by(id = id).first()
        db.session.delete(car)
        db.session.commit()
        return make_response(jsonify({"message":"Car has been deleted successfully"}), 200)

api.add_resource(CarByID, '/cars/<int:id>')

if __name__ == "__main__":
    app.run(port=5555, debug=True)