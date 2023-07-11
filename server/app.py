#!usr/bin/env python3
from flask import  make_response, jsonify, request, session, render_template
from flask_restful import Resource
from config import  db, api, app
from models import  User, Car, Review
from sqlalchemy.exc import IntegrityError

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")
# class Index(Resource):
#     def get(self):
#         return f'Welcome to Car/User/Review API'
# api.add_resource(Index, '/')

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
api.add_resource(Users, "/users")

class SignUp(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")
        email = data.get("email") 

        user = User(
            username = username,
            email = email
        )
        # the setter will encrypt this
        user.password_hash = password
        print("first")

        try:
            print("here")
            db.session.add(user)
            db.session.commit()

            # store the new user in a session object 
            session["user_id"] = user.id

            print(user.to_dict())
            return make_response(jsonify(user.to_dict()), 201)
        except IntegrityError:
            print("no, here!")
            return {"error": "422 Unprocessable request"}, 422
api.add_resource(SignUp, "/signup")

class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return make_response(jsonify(user.to_dict()))
        return make_response(jsonify({"error": "401: Unthorized"}), 401)
api.add_resource(Login, "/login")

class Logout(Resource):
    def delete(self):            
            session["user_id"] = None
            return {"message": "user logged out successfuly"}, 200
api.add_resource(Logout, "/logout")

class CheckSession(Resource):
    def get(self):
        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()
            return make_response(jsonify(user.to_dict()), 200)
        return {"Login"}, 401
api.add_resource(CheckSession, "/check_session")

class Cars(Resource):
    def get(self):
        cars = [car.to_dict() for car in Car.query.all()]
        return make_response(jsonify(cars), 200)
    
    def post(self):
        data = request.get_json()

        new_car = Car(
            name=data["name"],
            image_url = data["image_url"],
            color=data["color"],
            year=data["year"],
            engine=data["engine"],
            mileage=data["mileage"],
            category=data["category"]
        )
        db.session.add(new_car)
        db.session.commit()

        return make_response(jsonify(new_car.to_dict()), 201)
api.add_resource(Cars, '/cars')

class CarByID(Resource):
    def patch(self, id):
        car = Car.query.get(id)
        if not car:
            return make_response(jsonify({"message": "Car not found"}), 404)

        data = request.get_json()
        for attr in data:
            setattr(car, attr, data[attr])
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
        data = request.get_json()

        new_review = Review(
            car_id=data["car_id"],
            rating=data["rating"], 
            comments=data["comments"],
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