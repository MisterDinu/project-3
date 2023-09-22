import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask_cors import CORS

# python -m http.server [PORT] 8001


#################################################
# Database Setup 
#################################################



# For the API Routes:

# Meses en los que más delitos (filtro por tipo de delito) hay

# Tipos de delito que suceden más (filtro por alcaldía)

# Delitos en temporada de pandemia, suicidios en temporada de pandemia

# Mapa con delitos (cada delito un layer), coordenadas
