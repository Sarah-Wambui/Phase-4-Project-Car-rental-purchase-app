from models import db, Car, User, Review, car_users
from faker import Faker
from app import app
from random import randint, choice as rc

fake = Faker()

with app.app_context():
    Car.query.delete()
    User.query.delete()
    Review.query.delete()
    bmw = Car(
        name = 'BMW',
        color = 'Blue',
        year = 2021,
        engine = 'Petrol 1.5L',
        mileage = 45000,
        category = 'For Sale',
        status = 'Available',
        image_url = "https://hips.hearstapps.com/hmg-prod/images/bmw-1669908626.jpeg?crop=0.801xw:0.601xh;0.151xw,0.254xh&resize=800:*",
    )
    audi = Car(
        name = 'Audi',
        color = 'yellow',
        year = 2023,
        engine = 'Petrol 2.5L',
        mileage = 25000,
        category = 'For Rent',
        status = 'Not Available',
        image_url = "https://hips.hearstapps.com/hmg-prod/images/audi-1669908451.jpeg?crop=0.824xw:0.673xh;0.155xw,0.277xh&resize=800:*",
    )
    mercedes = Car(
        name = 'Mercedes',
        color = 'Black',
        year = 2011,
        engine = 'Diesel 2.0L',
        mileage = 40000,
        category = 'For Sale',
        status = 'Available',
        image_url = "https://hips.hearstapps.com/hmg-prod/images/mercedes-benz-1669908909.jpeg?crop=0.699xw:0.522xh;0.301xw,0.478xh&resize=800:*",
    )
    lexus = Car(
        name = 'Lexus',
        color = 'Greeb',
        year = 2016,
        engine = 'Diesel 4.0L',
        mileage = 2000,
        category = 'For Sale',
        status = 'Available',
        image_url = "https://hips.hearstapps.com/hmg-prod/images/lexus-1669910354.jpeg?crop=0.915xw:0.812xh;0,0.124xh&resize=800:*",
    )
    chevrolet = Car(
        name = 'Chevrolet',
        color = 'Gret',
        year = 2014,
        engine = 'Petrol 1.3L',
        mileage = 70000,
        category = 'For Rent',
        status = 'Not Available',
        image_url = "https://hips.hearstapps.com/hmg-prod/images/chevrolet-1669909255.jpeg?crop=0.803xw:0.604xh;0.153xw,0.291xh&resize=800:*",
    )
    ford = Car(
        name = 'Ford',
        color = 'Red',
        year = 2006,
        engine = 'Diesel 2.8L',
        mileage = 23000,
        category = 'For Rent',
        status = 'Not Available',
        image_url = "https://hips.hearstapps.com/hmg-prod/images/ford-1669908308.jpeg?crop=0.943xw:1.00xh;0,0&resize=800:*",
    )
    porche = Car(
        name = 'Porche',
        color = 'White',
        year = 2016,
        engine = 'Diesel 2.4L',
        mileage = 100000,
        category = 'For Sale',
        status = 'Available',
        image_url = "https://hips.hearstapps.com/hmg-prod/images/porsche-1669909866.jpeg?crop=1.00xw:0.753xh;0,0.100xh&resize=800:*",
    )
    bentley = Car(
        name = 'Bentley',
        color = 'White',
        year = 2022,
        engine = 'Petrol 2.0L',
        mileage = 4000,
        category = 'For Sale',
        status = 'Available',
        image_url = "https://hips.hearstapps.com/hmg-prod/images/bentley-1669908521.jpeg?crop=0.803xw:0.604xh;0.0635xw,0.200xh&resize=800:*",
    )
    rollsroyce = Car(
        name = 'Rolls-Royce',
        color = 'Red',
        year = 2015,
        engine = 'Petrol 2.4L',
        mileage = 6000,
        category = 'For Rent',
        status = 'Available',
        image_url = "https://hips.hearstapps.com/hmg-prod/images/rolls-royce-1669908334.jpeg?crop=1.00xw:0.752xh;0,0.123xh&resize=800:*",
    )
    toyota = Car(
        name = 'Toyota',
        color = 'Grey',
        year = 2019,
        engine = 'Diesek 1.4L',
        mileage = 60000,
        category = 'For Sale',
        status = 'Available',
        image_url = "https://hips.hearstapps.com/hmg-prod/images/toyota-1669909552.jpeg?crop=1.00xw:0.752xh;0,0.166xh&resize=800:*",
    )
    db.session.add_all([bmw, audi, mercedes, lexus, chevrolet, ford, porche, bentley, rollsroyce, toyota])

    users = []
    for i in range(5):
        user = User(
            username = fake.first_name(),
            _password_hash = fake.password(),
            email = fake.email()
        )
        users.append(user)
    db.session.add_all(users)

    reviews = []
    for user in users:
        for i in range(10):
            review = Review(
                comments = fake.paragraph(),
                rating = randint(1, 5),
                user_id = randint(1, 5),
                car_id = randint(1, 10)
            )
            reviews.append(review)
    db.session.add_all(reviews)

    for car in [bmw, audi, mercedes, lexus, chevrolet, ford, porche, bentley, rollsroyce, toyota]:
        r = rc(reviews)
        car.review = r
        reviews.remove(r)
        
    combinations = set()
    for _ in range(10):
        user_id = randint(1, 5)
        car_id = randint(1, 10)
        if (user_id, car_id) in combinations:
            continue
        combinations.add((user_id, car_id))
        car_user_data = {"user_id": user_id, "car_id": car_id}
        statement = db.insert(car_users).values(car_user_data)
        db.session.execute(statement)
        db.session.commit()
    db.session.commit()