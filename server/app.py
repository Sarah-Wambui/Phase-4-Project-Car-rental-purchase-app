#!usr/bin/env python3
from flask import  make_response, jsonify, request
from flask_restful import Resource
from config import  db, api, app
from models import  User, Car, Review

class Index(Resource):
    def get(self):
        return f'Welcome to Car/User/Review API'
api.add_resource(Index, '/')

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify({"users": users}), 200)
api.add_resource(Users, "/users")

class SignUp(Resource):
    def post(self):
        new_user = User(
            username = request.form["username"]
        )
        new_user.password_hash = request.form["_password_hash"]
        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify(new_user.to_dict()), 201)
api.add_resource(SignUp, "/signup")


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

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return make_response(jsonify(reviews), 200)

    def post(self):
        new_review = Review(
            car_id=request.form["car_id"],
            rating=request.form["rating"], 
            comments=request.form["comments"]
        )
        db.session.add(new_review)
        db.session.commit()
        return make_response(jsonify(new_review.to_dict()), 201)

api.add_resource(Reviews, '/reviews')

class ReviewByID(Resource):
    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            return make_response(jsonify({"message": "Review not found"}), 404)
        db.session.delete(review)
        db.session.commit()
        return make_response(jsonify({"message": "Review has been deleted successfully"}), 200)

api.add_resource(ReviewByID, '/reviews/<int:id>')

if __name__ == "__main__":
    app.run(port=5555, debug=True)