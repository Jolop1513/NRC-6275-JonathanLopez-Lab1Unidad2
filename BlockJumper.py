# Se importan las librerias necesarias para trabajar con el framwork Flask
import os
from flask import Flask, render_template

"""
Se realiza el llamado a la aplicacion para ejecutar nuestro programa
mediante flask utilizando sus respectivas librerias. 
"""
app = Flask(__name__)

"""
Este es el paquete para llamar los templates estaticos 
"""
app._static_folder = os.path.abspath("templates/static/")

"""
En esta parte se llama a la pagina principal del jueg
"""
@app.route("/", methods = ["GET"])
def index():
    return render_template("layouts/index.html")


"""
Este es el main principal de nuestro aplicacion Game 
"""
if __name__ == "__main__":
     app.run(debug=True)