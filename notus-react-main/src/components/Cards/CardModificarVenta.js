import React from "react";
import {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

// components

export default function CardModificarVenta() {
  const [form,setForm] = useState({name:'',reference:'',price:'',quantity:''});
  const router = useHistory();
  
  function handleCodigoOnChange(e){
    console.log(e.target.value)
    setForm({...form,codigo:e.target.value})
  }
  function handleNameProductOnChange(e){
    console.log(e.target.value)
    setForm({...form,name:e.target.value})
  }
  function handleReferenceProductOnChange(e){
    console.log(e.target.value)
    setForm({...form,reference:e.target.value})
  }
  function handlePriceProductOnChange(e){
    console.log(e.target.value)
    setForm({...form,price:e.target.value})
  }
  function handleQuantityProductOnChange(e){
    console.log(e.target.value)
    setForm({...form,quantity:e.target.value})
  }

  function modificarProducto() {
    axios.post("http://localhost:3001/modificarProducto", {
      "codigo":form.codigo,
      "nombre":form.name, 
      "referencia":form.reference,
      "precio":form.price,
      "cantidad":form.quantity
      })
      .then((response) => {
        if(response.status==200){
          router.push('/admin')
        }else{
          console.log(response)
          //setForm({...form,name:response.})
        }
      });
  }

  function buscarProducto() {
    axios.post("http://localhost:3001/buscarProducto", {
      "codigo":form.codigo
      })
      .then((response) => {
        if(response.status==200){
          /*console.log(response.data)
          console.log(response.data.cantidad)
          console.log(response.data.referencia_producto)*/
          setForm({...form,name:response.data.nombre_producto,reference:response.data.referencia_producto,price:response.data.precio_unitario,quantity:response.data.cantidad})
        }else{
          router.push('/admin')
        }
      });
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">MODIFICACIÓN DE PRODUCTOS</h6>
            
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => buscarProducto()}
              >
                Buscar Producto
              </button>
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Código Producto
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.codigo}
                    onChange={(e) =>{handleCodigoOnChange(e)}}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={(e) => modificarProducto()}
            >
              Modificar Producto
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Descripción de Venta
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre Producto
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>{handleNameProductOnChange(e)}}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Referencia Producto
                  </label>
                  <input
                    id="reference"
                    type="text"
                    value={form.reference}
                    onChange={(e) =>{handleReferenceProductOnChange(e)}}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio Unitario
                  </label>
                  <input
                    id="price"
                    type="text"
                    value={form.price}
                    onChange={(e) =>{handlePriceProductOnChange(e)}}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Cantidad
                  </label>
                  <input
                    id="quantity"
                    type="text"
                    value={form.quantity}
                    onChange={(e) =>{handleQuantityProductOnChange(e)}}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
            </div>

           
          </form>
        </div>
      </div>
    </>
  );
}

/*

<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">REGISTROS DE PRODUCTOS</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={(e) => crearProducto()}
            >
              Guardar Registro Producto
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Descripción Producto
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre Producto
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>{handleNameProductOnChange(e)}}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Referencia Producto
                  </label>
                  <input
                    id="reference"
                    type="text"
                    value={form.reference}
                    onChange={(e) =>{handleReferenceProductOnChange(e)}}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio Unitario
                  </label>
                  <input
                    id="price"
                    type="text"
                    value={form.price}
                    onChange={(e) =>{handlePriceProductOnChange(e)}}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Cantidad
                  </label>
                  <input
                    id="quantity"
                    type="text"
                    value={form.quantity}
                    onChange={(e) =>{handleQuantityProductOnChange(e)}}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
            </div>

           
          </form>
        </div>
      </div>
*/ 