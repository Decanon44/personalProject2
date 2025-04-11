import pickle

import mysql.connector
import pandas as pd
from sklearn.linear_model import LinearRegression

# Conectar a MySQL
conn =mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="12345",
    database="tienda")

# Cargar datos desde la tabla "ventas"
query = "SELECT DATEDIFF(fecha_venta, (SELECT MIN(fecha_venta) FROM ventas)) + 1  as fecha_venta,coalesce(sum(valor_total),0) as valor_total FROM ventas  group by 1;"
df = pd.read_sql(query, conn)
conn.close()

# Dividir en variables independientes (X) y dependientes (y)
X = df[['fecha_venta']]  # Reemplaza con tus columnas de entrada
y = df['valor_total']    # Reemplaza con la columna de salida

# Crear y entrenar el modelo
model = LinearRegression()
model.fit(X, y)

# Guardar el modelo con pickle
with open("modelo.pkl", "wb") as file:
    pickle.dump(model, file)

print("Modelo guardado exitosamente como modelo.pkl")