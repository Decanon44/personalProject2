# backend flask
#Conexión con un modelo de predicción (modelo.pkl)
#Upload de archivos con ventas
#Login
#Una predicción simple usando datos de ventas
#Todo conectado con una base de datos MySQL

from flask import Flask,Request,request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS
from  models.VentaModel import *

UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
CORS(app,origins=["*"])

#model = pickle.load(open('model.pkl','rb'))
#df = pd.read_csv('time_series.csv',  parse_dates=[0], header=None,index_col=0, squeeze=True,names=['fecha','unidades'])
#df.head()


@app.route('/')
def hello_world(methods=['POST','GET']):
    return 'Hello, World!'

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        print("Datos recibidos por POST:")
        print("JSON:", request.get_json())  # Si envías JSON
        print("Form:", request.form)        # Si envías un formulario
        print("Data cruda:", request.data)  # Raw data}
        datos = request.get_json()
        email = datos.get('email')
        password = datos.get('password')
        if( email=='admin@coratiendas.com' and password=="admin"):
            return "OK"
        

    if request.method == 'GET':
        print("Datos recibidos por GET:")
        print("Args:", request.args)

    return "wrong"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploadFile', methods=['POST'])
def loadData():#recibo el archivo
    if 'file' in request.files:
        file = request.files['file']
        print("Hola.........")
        print(file)
        file.save(file.filename)
        f = open(file.filename, "r")
        line = f.readline()
        val=[]
        while line:
          if("%"in line or "*" in line):
            line = f.readline()
          else:
            print(line)
            data=line.split(";")
            print(data)
            data[3]=data[3].replace("\n","")
            dataFecha=data[3].split("/")
            print("fecha data")
            print(dataFecha)
            data[3]=dataFecha[2]+"-"+dataFecha[1]+"-"+dataFecha[0]
            val.append((data[1],data[2],data[3]))
            line = f.readline()
          
            
          
          

          
        print("entro0")
        print(val)
        insertData(val)
        print("entro1")
    return 'file uploaded successfully'

@app.route('/getDataMatrix', methods=['GET'])
def getDataMatrix():#recibo el archivo
    #REALIZ EL SELECT *
    #SERIALIZAR JSON
    #return "Hola Mundo"
    with open('modelo.pkl', 'rb') as f:
        modelo = pickle.load(f)
    data=sumTotalByDay()
    dataLabel = []     # Fechas
    dataValor = []     # Valores reales (ventas)
    dataDia = []       # Día como número [1], [2], [3]...

    for i, d in enumerate(data):
        dataLabel.append(str(d[0]))   # fecha_venta
        dataValor.append(int(d[1]))   # valor_total
        dataDia.append([i + 1])    
    prediccion = modelo.predict(dataDia)  # Predice con base en los días

    dataValor2 = [int(p) for p in prediccion]  # Convertir a int

    # 4. Retornar el resultado como JSON
    return jsonify({
        "labels": dataLabel,
        "valores": dataValor,
        "valores2": dataValor2
    })
    
    
    
#revisar
def series_to_supervised(data, n_in=1, n_out=1, dropnan=True):
    n_vars = 1 if type(data) is list else data.shape[1]
    df = pd.DataFrame(data)
    cols, names = list(), list()
    # input sequence (t-n, ... t-1)
    for i in range(n_in, 0, -1):
        cols.append(df.shift(i))
        names += [('var%d(t-%d)' % (j+1, i)) for j in range(n_vars)]
    # forecast sequence (t, t+1, ... t+n)
    for i in range(0, n_out):
        cols.append(df.shift(-i))
        if i == 0:
            names += [('var%d(t)' % (j+1)) for j in range(n_vars)]
        else:
            names += [('var%d(t+%d)' % (j+1, i)) for j in range(n_vars)]
    # put it all together
    agg = pd.concat(cols, axis=1)
    agg.columns = names
    # drop rows with NaN values
    if dropnan:
        agg.dropna(inplace=True)
    return agg



@app.route('/predecir', methods=['POST'])
def predecir():
    try:
        # Cargar el modelo entrenado
        with open('modelo.pkl', 'rb') as file:
            model = pickle.load(file)

        # Obtener los datos de la solicitud JSON
        datos = request.json  # El JSON debe contener {"valores": [dato1, dato2, ...]}
        
        if 'valores' not in datos:
            return jsonify({'error': 'No se encontró la clave "valores" en la solicitud'}), 400

        # Convertir los datos en un DataFrame de Pandas
        df = pd.DataFrame(datos['valores'])

        # Hacer la predicción
        prediccion = model.predict(df)

        return jsonify({'prediccion': prediccion.tolist()})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500