Very simple backend application and a frontend application that provides the following functionalities: list, create and delete tutors. The user using the application sees a list of tutors and is able to either delete or add a new tutor. 

Persisting data in a file-based database;<br> 

Installation

Backend:

The backend was written in Python with Flask framework. Here are the steps to build, run and test this backend app (MacOs!):

System requirements: Python 3

- Clone the repo on your computer;
- Access the project's root folder;
- python3 -m venv flask
- source flask/bin/activate
- pip install flask flask-sqlalchemy flask_marshmallow pytest
- export FLASK_ENV=development

* To run the backend app:
    - python3 run.py
    - The backend app should be available on 127.0.0.1:5000
    
* To run the tests on the backend app:
    - pytest 
    
    
Frontend:

For the frontend I made a simple React application with Axios and React Router to consume the API.
Here are the steps to build and run this frontend app (MacOs!):

System requirements: npm or yarn
    
* To run the frontend app:
    - Access the 'frontend' folder;
    - yarn (or npm) install;
    - yarn (or npm) start
    - the frontend app should be available on 127.0.0.1:8081
    
* To build the frontend app into static files for production:
    - yarn build
