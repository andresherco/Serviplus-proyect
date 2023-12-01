import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import APIInvoke from "../../utils/APIInvoke";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

const InfoRespuestas = () => {
  const { id } = useParams();
  const [tikets, setTikets] = useState([]);
  const [respuesta, setRespuesta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respuestaEnviada, setRespuestaEnviada] = useState(false);
  const [fechaActual] = useState(moment().format("YYYY-MM-DD HH:mm:ss")); // Estado para la fecha actual

  useEffect(() => {
    const cargarTicket = async () => {
      try {
        const response = await APIInvoke.invokeGET(`/Tikets/${id}`);
        if (response && typeof response === "object") {
          setTikets(response);
        } else {
          console.error("La respuesta de la API no contiene detalles válidos para el ticket.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los detalles del ticket:", error);
      }
    };

    cargarTicket();
  }, [id]);

  useEffect(() => {
    const cargarRespuesta = async () => {
      try {
        const response = await APIInvoke.invokeGET(`/respuesta/${id}`);
        if (response && typeof response === "object") {
          setRespuesta(response);
          if (response.respuestaEnviada) {
            setRespuestaEnviada(true);
          }
        } else {
          console.error("La respuesta de la API no contiene detalles válidos para el ticket.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los detalles del ticket:", error);
      }
    };

    cargarRespuesta();
  }, [id]);

  return (
    <div className="wrapper d-flex flex-column">
      <Navbar />
      <SidebarContainer />
      <div className="content-wrapper flex-grow-1" style={{ paddingBottom: 0, marginBottom: 0 }}>
        <ContentHeader
          titulo={"Ver la respuesta"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Respuesta"}
          ruta2={"/Home"}
        />
        <section className="content flex-grow-1">
          <div className="card-header bg-primary">
            <h1 className="card-title">Información del Ticket</h1>
          </div>
          <table>
            <thead>
              <tbody>
                {loading ? (
                  <p>Cargando detalles del ticket...</p>
                ) : (
                  <tr key={tikets.id}>
                    <tr>
                      <p>
                        <strong>Email del usuario: </strong>
                        {tikets.email}
                      </p>
                    </tr>
                    <tr>
                      <p>
                        <strong>ID Ticket: </strong>
                        {tikets.id}
                      </p>
                    </tr>
                    <tr>
                      <p>
                        <strong>Fecha Creación Ticket: </strong>
                        {tikets.fecha}
                      </p>
                    </tr>
                    <tr>
                      <p>
                        <strong>Contenido Ticket: </strong>
                        {tikets.contenido}
                      </p>
                    </tr>
                  </tr>
                )}
              </tbody>
            </thead>
          </table>
          <div className="card-header bg-success">
            <h1 className="card-title">Información de la Respuesta</h1>
          </div>
          <table>
            <thead>
              <tbody>
                {loading ? (
                  <p>Cargando detalles del ticket...</p>
                ) : (
                  <tr key={respuesta.id}>
                    <tr>
                      <p>
                        <strong>ID Respuesta: </strong>
                        {respuesta.id}
                      </p>
                    </tr>
                    <tr>
                      <p>
                        <strong>Fecha Respuesta: </strong>
                        {fechaActual} {/* Mostrar la fecha actual */}
                      </p>
                    </tr>
                    <tr>
                      <p>
                        <strong>Contenido Respuesta: </strong>
                        {respuesta.respuesta}
                      </p>
                    </tr>
                  </tr>
                )}
              </tbody>
            </thead>
          </table>
          &nbsp;
          <tr></tr>
          {respuestaEnviada && (
            <span className="text-success">Ya se envió una respuesta</span>
          )}
          <Link to={`/Respuestas`} className="btn btn-danger ml-3">
            Volver
          </Link>
        </section>
      </div>
    </div>
  );
};

export default InfoRespuestas;
