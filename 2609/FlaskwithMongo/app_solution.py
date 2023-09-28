# Import the dependencies.
from flask import Flask, jsonify,render_template
from flask_pymongo import PyMongo
from bson import json_util
import json
# Create an app, being sure to pass __name__
app = Flask(__name__)
app.config["MONGO_URI"]="mongodb://localhost:27017/PROJECT4"
mongo=PyMongo(app)

# Create a dictionary to hold a key, value pair.
hello_dict = {"/normal": "ROBO A NEGOCIO SIN VIOLENCIA"}

# Define what to do when a user hits the index route.
@app.route("/")
def home():
    mongo.db.PGJcarpetas
    text=['HOLA']
    data={
        'titulo':'Project3',
        'bienvenida':'Saludos',
        'initial text':'Available Routes:<br/>',
        'roots':text,
    }
    return render_template('index.html',data=data) 

@app.route("/delitos_keys")
def delitos_keys():
    #Getting all the keys to show data
    #######DELITOS COUNT
    results_delitos = list(mongo.db.PGJcarpetas.distinct("delito"))
    return results_delitos

@app.route("/anos_keys")
def anos_keys():
    #Getting all the keys to show data
    #######DELITOS COUNT
    result_ano=  list(mongo.db.PGJcarpetas.distinct("anio_hecho"))
    return result_ano
@app.route("/alcaldias_keys")
def alcaldias_keys():
    #Getting all the keys to show data
    #######DELITOS COUNT
    results_alcaldias = list(mongo.db.PGJcarpetas.distinct("alcaldia_hecho"))
    return results_alcaldias

###Getting the count of delitos
@app.route("/DELITOS_COUNT")
def delitos_count_function():
    ##group by delitos
    group_query = {'$group': {'_id': "$delito", 'count': { '$sum': 1 }}}
    sort_values = {'$sort': { 'count': -1 }}
    # Put the pipeline together
    pipeline = [group_query, sort_values]
    results = list(mongo.db.PGJcarpetas.aggregate(pipeline))
    return results
#Count of alcaldias
@app.route("/alcaldiascount")
def alcaldiacount():

    # Write an aggregation query that counts the number of documents, grouped by "MES"
    group_query = {'$group': {'_id': "$alcaldia_hecho", 'count': { '$sum': 1 }}}
    sort_values = {'$sort': { 'count': -1 }}
    # Put the pipeline together
    pipeline = [group_query, sort_values]
    results = list(mongo.db.PGJcarpetas.aggregate(pipeline))
    return results
##count of años
@app.route("/anocount")
def anocount():

    # Write an aggregation query that counts the number of documents, grouped by "MES"
    group_query = {'$group': {'_id': "$anio_hecho", 'count': { '$sum': 1 }}}
    sort_values = {'$sort': { 'count': -1 }}
    # Put the pipeline together
    pipeline = [group_query, sort_values]
    results = list(mongo.db.PGJcarpetas.aggregate(pipeline))
    return results

@app.route("/COUNT/suicidio/<ano>/")
def delitomasalcaldia(ano):
    ano_clean=int(ano)
    # Build the aggregation pipeline
    match_query = {'$match': {'delito': 'PERDIDA DE LA VIDA POR SUICIDIO','anio_hecho': ano_clean}}
    # Write an aggregation query that counts the number of documents, grouped by "MES"
    group_query = {'$group': {'_id': "$mes_inicio", 'count': { '$sum': 1 }}}
    # Create a dictionary that will allow the pipeline to sort by count in descending order
    sort_values = {'$sort': { 'count': +1 }}
    # Put the pipeline together
    pipeline = [match_query, group_query, sort_values]
    results = list(mongo.db.PGJcarpetas.aggregate(pipeline))
    return (results)

@app.route("/<delito>/<ano>")
def delitomasano(delito,ano):
    delito_clean=delito.upper()
    ano_clean=int(ano)
    # Build the aggregation pipeline
    match_query = {'$match': {'delito': 'ROBO A TRANSEUNTE EN VIA PUBLICA CON VIOLENCIA','anio_hecho': 2018}}
    query = {'delito': 'ROBO A TRANSEUNTE EN VIA PUBLICA CON VIOLENCIA','anio_hecho': 2018}
    fields = {'longitud': 1, 'latitud': 1,'alcaldia_hecho':1}
    # Capture the results to a variable
    results = list(mongo.db.PGJcarpetas.find(query, fields))
    
    list_of_dict=[]
    for i in range(len(results)):
        #initializate variables
        location={}
        location["longitud"]=0
        location["latitud"]=0
        location["alcaldia"]=0
        location["alcaldia_hecho"]=0
        ##########################
        longitud=results[i]['longitud']
        latitud=results[i]['latitud']
        alcaldia=results[i]['alcaldia_hecho']
        ######creating dictionary
        location["longitud"]=longitud
        location["latitud"]=latitud
        location["alcaldia"]=alcaldia
        list_of_dict.append(location)

    return list_of_dict
if __name__ == "__main__":
    app.run(debug=True,port=5001)


