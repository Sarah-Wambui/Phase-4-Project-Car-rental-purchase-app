#!usr/bin/env python3
from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from models import db, Car, User, Review
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = b'\xa64\x16\xd5\x89\x14\xcd\x1b1\xcf\x82\x99$so'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cars.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] =False
app.json.compact = False
CORS(app)

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
        cars = [car.to_dict() for car in Car.query.all()]
        return make_response(jsonify(cars), 200)
    
    def post(self):
        new_car = Car(
            name = request.form["name"],
            image_url = request.form['image_url'],
            year = request.form['year'],
            engine = request.form['engine'],
            color = request.form['color'],
            category = request.form['category'],
            mileage = request.form['mileage']
        )
        db.session.add(new_car)
        db.session.commit()
        return make_response(jsonify(new_car.to_dict()), 201)

    def patch(self, id):
        car = Car.query.filter(id = id).first()
        for attr in request.form:
            setattr(car, attr, request.form[attr])
        db.session.add(car)
        db.session.commit()
        return make_response(jsonify(car.to_dict()), 200)



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