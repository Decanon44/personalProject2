import React, { useState } from "react";
import Chart from "chart.js";
import axios from "axios";

export default function CardLineChartReg() {
  const [datos, setDatos] = useState();
  const [file, setFile] = useState();
  const [fecha, setFecha] = useState("");
  const [resultado, setResultado] = useState(null);

  // Carga de archivo
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:5000/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  // Predicción por fecha
  function handleFechaSubmit(event) {
    event.preventDefault();
    if (!fecha) return;

    axios
      .get(`http://localhost:5000/predecirfecha?fecha=${fecha}`)
      .then((response) => {
        setResultado(response.data.resultado);
      })
      .catch((error) => {
        console.error("Error al predecir:", error);
        setResultado("Error al obtener la predicción.");
      });
  }

  // Carga de datos para la gráfica
  React.useEffect(() => {
    axios.get("http://localhost:5000/getDataMatrix").then((data) => {
      console.log(data.data);
      setDatos(data.data);

      var config = {
        type: "line",
        data: {
          labels: data.data.labels,
          datasets: [
            {
              label: "Ventas " + new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: data.data.valores,
              fill: false,
            },
            {
              label: "Regresión Lineal",
              fill: false,
              backgroundColor: "#fff",
              borderColor: "#fff",
              data: data.data.valores2,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Sales Charts",
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Mes",
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Valor",
                  fontColor: "white",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(255, 255, 255, 0.15)",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };

      var ctx = document.getElementById("line-chart").getContext("2d");
      window.myLine = new Chart(ctx, config);
    });
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Ventas y Proyecciones Anual
              </h6>
              <h2 className="text-white text-xl font-semibold">Ingresos</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>

      {/* 📤 Formulario de carga */}
      <div className="mb-6 bg-blueGray-700 p-4 rounded shadow-lg">
        <form
          method="post"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="text-white text-lg mb-2 font-semibold">
            Carga de archivo de Ventas
          </h2>
          <input
            type="file"
            onChange={handleChange}
            className="text-white mb-2"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </div>

      {/* 📅 Formulario de predicción por fecha */}
      <div className="mb-6 bg-blueGray-700 p-4 rounded shadow-lg">
        <form onSubmit={handleFechaSubmit} className="flex items-center gap-2">
          <h2 className="text-white mr-2">Predecir ventas por fecha:</h2>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="rounded px-2 py-1 text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            Predecir
          </button>
        </form>
        {resultado && (
          <div className="mt-2 text-white">
            <strong>Resultado:</strong> {resultado}
          </div>
        )}
      </div>
    </>
  );
}
