from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, PasswordField
from wtforms.validators import DataRequired, Length, Email, NumberRange

class RegistrationForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField("Email", validators=[DataRequired(), Email()])
    # password = PasswordField("Password", validators=[DataRequired(), Length(min=6, max=20)])

class LoginForm(FlaskForm):
        username = StringField("Username", validators=[DataRequired(), Length(min=2, max=20)])
        email = StringField("Email", validators=[DataRequired(), Email()])


class CarForm(FlaskForm):
       name = StringField('Name', validators=[DataRequired(), Length(min=2, max=50)])
       color = StringField('Color', validators=[DataRequired(), Length(min=2, max=20)])
       year = IntegerField('Year', validators=[DataRequired(), NumberRange(min=1886, max=2023)])
       engine = StringField('Engine', validators=[DataRequired(), Length(min=2, max=50)])
       mileage = IntegerField('Mileage', validators=[DataRequired(), NumberRange(min=0)])
       category = StringField('Category', validators=[DataRequired(), Length(min=2, max=50)])

class ReviewForm(FlaskForm):
    car_id = IntegerField('Car ID', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    comments = StringField('Comments', validators=[DataRequired()])