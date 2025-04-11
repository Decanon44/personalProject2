import mysql.connector
from  utils.connection import *



def insertData(values):
  print("entro")
  con=conectar()
  cur = con.cursor()

  sql = "INSERT INTO ventas (codigo_producto,cedula_cliente, cantidad,valor_total,fecha_venta) VALUES (1, 1,%s,%s,%s)"
  # Execute a query
  cur.executemany(sql,values)
  # Fetch one result
  con.commit()
  # Close connection
  con.close()


def sumTotalByDay():
  con=conectar()
  cur = con.cursor()
  sql="select coalesce(fecha_venta,'') as fecha_venta,coalesce(sum(valor_total),0) from ventas group by 1;"
  print(sql)
  cur.execute(sql)

  myresult = cur.fetchall()
  return myresult