import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import APIInvoke from "../../utils/APIInvoke";
import { Link } from "react-router-dom";

const Respuestas = () => {
  const [respuesta, setRespuesta] = useState([]);

  useEffect(() => {
    cargarRespuesta();
  }, []);

  const cargarRespuesta = async () => {
    const response = await APIInvoke.invokeGET("/respuesta");
    setRespuesta(response);
  };

  useEffect(() => {
    cargarRespuesta();
  }, []);

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div class="content-wrapper">
        <ContentHeader
          titulo={"Listado de Respuestas"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Respuestas"}
          ruta2={"/Home"}
        />

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Ver Respuestas</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                  title="Remove"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body" style={{ paddingBottom: 0 }}> {/* Estilo para eliminar espacio en blanco del footer */}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Id</th>
                    <th style={{ width: "25%" }}>Contenido de la respuesta</th>
                    <th style={{ width: "20%" }}>Fecha de respuesta</th>
                    <th style={{ width: "25%" }}>Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {respuesta.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.respuesta}</td>
                      <td>{item.fecha}</td>
                      <td>
                        <Link
                          to={`/InfoRespuesta/${item.id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Ver respuesta
                        </Link>
                        {item.respuestaEnviada && (
                          <span className="text-success">
                            Ya se envió una respuesta
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Respuestas;
