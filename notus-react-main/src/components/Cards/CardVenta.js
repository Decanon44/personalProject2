import React from "react";
import {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

// components

export default function CardVenta() {
  const [form,setForm] = useState({codigo:'',cliente:'',cantidad:'',total:''});
  const router = useHistory();
  function handleCodigoOnChange(e){
    console.log(e.target.value)
    setForm({...form,codigo:e.target.value})
  }
  function handleClienteOnChange(e){
    console.log(e.target.value)
    setForm({...form,cliente:e.target.value})
  }
  function handleCantidadOnChange(e){
    console.log(e.target.value)
    setForm({...form,cantidad:e.target.value})
  }
  function handleTotalOnChange(e){
    console.log(e.target.value)
    setForm({...form,total:e.target.value})
  }

  function venderProducto() {
    axios.post("http://localhost:3001/venderProducto", {
      "codigo":form.codigo, 
      "cliente":form.cliente,
      "cantidad":form.cantidad,
      "total":form.total
      })
      .then((response) => {
        if(response.status==200){
          router.push('/admin')
        }else{

        }
      });
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">VENTA DE PRODUCTOS</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={(e) => venderProducto()}
            >
              Registrar Venta Producto
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
                    Código Producto
                  </label>
                  <input
                    type="text"
                    value={form.codigo}
                    onChange={(e) =>{handleCodigoOnChange(e)}}
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
                    Cédula Cliente
                  </label>
                  <input
                    type="text"
                    value={form.cliente}
                    onChange={(e) =>{handleClienteOnChange(e)}}
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
                    type="text"
                    onChange={(e) =>{handleCantidadOnChange(e)}}
                    value={form.cantidad}
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
                    Valor Total
                  </label>
                  <input
                    type="text"
                    value={form.total}
                    onChange={(e) =>{handleTotalOnChange(e)}}
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