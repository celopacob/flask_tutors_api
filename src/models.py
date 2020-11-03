from marshmallow import Schema, fields

from . import db


# Models
class Tutor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))


# Schemas
class TutorSchema(Schema):
    class Meta:
        ordered = True

    id = fields.Int(dump_only=True)
    first_name = fields.Str()
    last_name = fields.Str()
