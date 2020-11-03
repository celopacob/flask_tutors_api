import pytest
from flask import json

from . import db
from .app import create_app
from .models import Tutor


@pytest.fixture
def client():
    app = create_app("testing")
    with app.app_context():
        db.create_all()
        client = app.test_client()
        yield client
        db.session.remove()
        db.drop_all()


def test_get_tutors(client):
    response = client.get(
        '/tutors',
    )
    data = json.loads(response.data.decode())

    # No data
    assert response.status_code == 200
    assert data['tutors'] == []

    # Sending some data to test
    client.post(
        '/tutors/',
        data=json.dumps({"first_name": "Will", "last_name": "Smith"}),
        content_type='application/json',
    )

    response = client.get(
        '/tutors',
    )
    data = json.loads(response.data.decode())

    assert response.status_code == 200
    assert data['tutors'][0]["first_name"] == "Will"


def test_new_tutor(client):
    response = client.post(
        '/tutors/',
        data=json.dumps({"first_name": "Fizz", "last_name": "Buzz"}),
        content_type='application/json',
    )

    data = json.loads(response.data.decode())

    assert response.status_code == 201
    assert data["tutor"]["first_name"] == "Fizz"


def test_new_tutor_already_exists(client):
    client.post(
        '/tutors/',
        data=json.dumps({"first_name": "Fizz", "last_name": "Buzz"}),
        content_type='application/json',
    )

    response = client.post(
        '/tutors/',
        data=json.dumps({"first_name": "Fizz", "last_name": "Buzz"}),
        content_type='application/json',
    )

    data = json.loads(response.data.decode())

    assert response.status_code == 200
    assert data["tutor"]["first_name"] == "Fizz"


def test_new_tutor_no_payload(client):
    response = client.post(
        '/tutors/',
    )

    assert response.status_code == 400


def test_delete_tutor(client):
    # Creating some data to delete
    client.post(
        '/tutors/',
        data=json.dumps({"first_name": "Fizz", "last_name": "Buzz"}),
        content_type='application/json',
    )

    new_tutor = Tutor.query.first()
    assert new_tutor.id == 1

    response = client.delete(
        f'/tutors/{new_tutor.id}',
    )

    assert response.status_code == 200


def test_delete_tutor_that_does_not_exists(client):
    response = client.delete(
        f'/tutors/1',
    )

    assert response.status_code == 404
