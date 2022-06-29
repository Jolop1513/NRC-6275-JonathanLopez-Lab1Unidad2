#Nombre: Jhostyn Javier Gavilanez Suarez 
# APP Block Jumper Game

# Se importan las librerias necesarias para trabajar con el framwork Flask
import os
from flask import Flask, render_template

"""
Se realiza el llamado a la aplicacion para ejecutar nuestro programa
mediante flask utilizando sus respectivas librerias. 
"""
app = Flask(__name__)

"""
Este es el paquete para llamar los templates estaticos que estan en la carpeta
de templates, como los css ,javscript y imagenes.
"""
app._static_folder = os.path.abspath("templates/static/")

"""
En esta parte se llama a la pagina principal del juego para que luego 
se ejcute de manera correcta y sastifactoria, ya que se representa mediante un
canvas.  
"""
@app.route("/", methods = ["GET"])
def index():
    return render_template("layouts/index.html")


"""
Este es el main principal de nuestro aplicacion Game, se ejecuta mediante el localhost, que nos 
va a permitir realizar dicha conexion.   
"""
if __name__ == "__main__":
     app.run(debug=True)