from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
bcrypt = Bcrypt(app)
app.secret_key = b'\xa64\x16\xd5\x89\x14\xcd\x1b1\xcf\x82\x99$so'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cars.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] =False
app.json.compact = False
CORS(app)



db = SQLAlchemy()

migrate=Migrate(app, db)

db.init_app(app)

api=Api(app)

