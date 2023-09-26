# Import the dependencies.
from flask import Flask, jsonify
from flask_pymongo import PyMongo
from bson import json_util
# Create an app, being sure to pass __name__
app = Flask(__name__)
app.config["MONGO_URI"]="mongodb://localhost:27017/PROJECT4"
mongo=PyMongo(app)

# Create a dictionary to hold a key, value pair.
hello_dict = {"Hello": "World!"}

# Define what to do when a user hits the index route.
@app.route("/")
def home():
    return "Hi"

# Define what to do when a user hits the /normal route
@app.route("/normal")
def normal():
    a=mongo.db.PGJcarpetas.count_documents({})
    query = {'delito': 'ROBO A NEGOCIO SIN VIOLENCIA'}
    results = mongo.db.PGJcarpetas.find(query)
    a=[]
    for result in results:
        result2=str(result)
        a.append(result2)
    return (a)

# Define what to do when a user hits the /jsonified route
@app.route("/jsonified")
def jsonified():
    return jsonify(hello_dict)

if __name__ == "__main__":
    app.run(debug=True,port=5001)


