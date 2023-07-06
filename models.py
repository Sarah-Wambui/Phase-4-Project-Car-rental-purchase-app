from sqlalchemy.ext.hybrid import hybrid_property
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

car_users = db.Table(
    "car_user",
    db.Column("car_id", db.ForeignKey("cars.id"), primary_key=True),
    db.Column("user_id", db.ForeignKey("users.id"), primary_key=True)
)

class Car(db.Model, SerializerMixin):
    __tablename__ = "cars"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    color = db.Column(db.String)
    year= db.Column(db.Integer)
    engine= db.Column(db.String)
    mileage = db.Column(db.Integer)
    category = db.Column(db.String)
    status = db.Column(db.String)
    image_url = db.Column(db.String)
    reviews = db.relationship("Review", backref="car")
    serialize_rules = ("-users.cars",)

    def __repr__(self):
        return f"Car {self.name} ID: {self.id}"
    
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id= db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    reviews = db.relationship("Review", backref="user")
    serialize_rules = ("-cars.users",)

    def __repr__(self):
        return f"User {self.username} ID: {self.id}"
    
class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    comments = db.Column(db.String)
    rating = db.Column(db.Integer)
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    serialize_rules = ("-car.reviews", "-user.reviews",)

    def __repr__(self):
        return f"Review {self.id} | comment: {self.comments}"