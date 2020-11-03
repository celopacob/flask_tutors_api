#!flask/bin/python

from flask import Flask, request, jsonify
from flask_cors import CORS
from marshmallow import ValidationError

from . import db
from .config import app_config
from .models import Tutor, TutorSchema


def create_app(env_name):

    # App initialization
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(app_config[env_name])

    tutor_schema = TutorSchema()
    tutors_schema = TutorSchema(many=True)

    @app.route('/tutors', methods=['GET'])
    def get_tutors():
        all_tutors = Tutor.query.all()
        return jsonify(tutors_schema.dump(all_tutors))

    @app.route('/tutors/<int:pk>', methods=['GET'])
    def get_tutor(pk):
        tutor = Tutor.query.get_or_404(pk)
        return jsonify(tutor_schema.dump(tutor))

    @app.route("/tutors/", methods=["POST"])
    def new_tutor():
        json_data = request.get_json()
        if not json_data:
            return {"message": "No input data provided"}, 400

        # Validate and deserialize input
        try:
            data = tutor_schema.load(json_data)
        except ValidationError as err:
            return err.messages, 422

        first_name = data["first_name"]
        last_name = data["last_name"]

        tutor = Tutor.query.filter_by(first_name=first_name, last_name=last_name).first()
        message = "Tutor already exists."
        code = 200

        if tutor is None:
            # Create a new tutor
            tutor = Tutor(first_name=first_name, last_name=last_name)
            db.session.add(tutor)
            db.session.commit()
            message = "New tutor created."
            code = 201

        result = tutor_schema.dump(Tutor.query.get(tutor.id))
        return {"message": message, "tutor": result}, code

    @app.route("/tutors/<int:pk>", methods=["DELETE"])
    def delete_tutor(pk):
        # Delete a tutor if found, otherwise return 404
        tutor = Tutor.query.get_or_404(pk)
        db.session.delete(tutor)
        db.session.commit()

        return {"message": f"Tutor {pk} deleted successfully."}

    db.init_app(app)
    return app
