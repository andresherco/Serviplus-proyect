import React, { useState } from "react";
import swal from "sweetalert";
import APIInvoke from "../../utils/APIInvoke";
import { Link } from "react-router-dom";

const CrearTikets = () => {
  // Función para obtener la fecha actual en formato YYYY-MM-DD
  const obtenerFechaActual = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Establecer el estado inicial con la fecha actual
  const [tiket, setTiket] = useState({
    email: "",
    contenido: "",
    fecha: obtenerFechaActual(), // Inicializar la fecha aquí
  });

  const { email, contenido, fecha } = tiket;

  const onChange = (e) => {
    setTiket({
      ...tiket,
      [e.target.name]: e.target.value,
    });
  };

  const crearTicket = async () => {
    // La fecha ya está establecida en el estado, así que no es necesario obtenerla de nuevo
    const data = {
      email: tiket.email,
      contenido: tiket.contenido,
      fecha: tiket.fecha, // Usa la fecha del estado que ya es la fecha actual
    };

    try {
      const response = await APIInvoke.invokePOST(`/Tikets`, data);
      const idTicket = response.id;

      if (idTicket === "") {
        swal({
          title: "Error",
          text: "El ticket no fue creado correctamente.",
          icon: "error",
          buttons: {
            confirm: {
              text: "Ok",
              value: true,
              visible: true,
              className: "btn btn-danger",
              closeModal: true,
            },
          },
        });
      } else {
        swal({
          title: "Información",
          text: "El ticket fue creado correctamente.",
          icon: "success",
          buttons: {
            confirm: {
              text: "Ok",
              value: true,
              visible: true,
              className: "btn btn-primary",
              closeModal: true,
            },
          },
        });

        // Reiniciar el estado, excepto la fecha
        setTiket({
          email: "",
          contenido: "",
          fecha: obtenerFechaActual(),
        });
      }
    } catch (error) {
      console.error("Error al crear el ticket:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    crearTicket();
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h1>Crear Ticket</h1>
              </div>
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email (usuario)</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Ingrese su email"
                      onChange={onChange}
                      value={email}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contenido">Contenido</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contenido"
                      name="contenido"
                      placeholder="Ingrese su solicitud"
                      onChange={onChange}
                      value={contenido}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fecha">Fecha</label>
                    <input
                      type="text" // Cambiar a tipo text para que se muestre la fecha pero no sea un campo de fecha editable
                      className="form-control"
                      id="fecha"
                      name="fecha"
                      value={fecha}
                      readOnly // Hace que el campo sea de solo lectura
                    />
                  </div>
                  <div className="social-auth-links text-center mb-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-primary"
                    >
                      Enviar
                    </button>
                  </div>
                  <Link to={"/"} className="btn btn-block btn-danger">
                    Iniciar Sesión
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearTikets;
