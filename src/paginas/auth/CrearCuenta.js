import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const CrearCuenta = () => {


  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmar: ""
  });

  const { nombre, apellido, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

 

    const create = async () => {
      if (password !== confirmar) {
        const msg = "Las contraseñas son diferentes";
        swal({
          title: "Error",
          text: msg,
          icon: "error",
          buttons: {
            confirm: {
              text: "ok",
              value: true,
              visible: true,
              className: "btn btn-danger",
              closeModal: true
            }
          }
        });
      } else if (password.length < 6) {
        const msg = "La contraseña debe tener al menos 6 caracteres";
        swal({
          title: "Error",
          text: msg,
          icon: "error",
          buttons: {
            confirm: {
              text: "ok",
              value: true,
              visible: true,
              className: "btn btn-danger",
              closeModal: true
            }
          }
        });
      } else {
        const data = {
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          password: usuario.password
        };
    
        const usuariosExistentes = await APIInvoke.invokeGET(`/Usuarios?email=${usuario.email}`);
        if (usuariosExistentes && usuariosExistentes.length > 0) {
          const msg = "El usuario ya está registrado.";
          swal({
            title: "Error",
            text: msg,
            icon: "error",
            buttons: {
              confirm: {
                text: "ok",
                value: true,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
              }
            }
          });
        } else {
          const response = await APIInvoke.invokePOST(`/Usuarios`, data);
          const mensaje = response.msg;
          if (mensaje === "el usuario ya existe") {
            const msg = "El usuario ya existe";
            swal({
              title: "Error",
              text: msg,
              icon: "error",
              buttons: {
                confirm: {
                  text: "ok",
                  value: true,
                  visible: true,
                  className: "btn btn-danger",
                  closeModal: true
                }
              }
            });
          } else {
            const msg = "El usuario fue creado correctamente";
            swal({
              title: "Información",
              text: msg,
              icon: "success",
              buttons: {
                confirm: {
                  text: "ok",
                  value: true,
                  visible: true,
                  className: "btn btn-primary",
                  closeModal: true
                }
              }
            });
    
            setUsuario({
              nombre: "",
              apellido: "",
              email: "",
              password: "",
              confirmar: ""
            });
         
          }
          
        }
        navigate("/"); // Utiliza navigate en lugar de history.push
      }
     

    };

  const onSubmit = (e) => {
    e.preventDefault();
    create();
    
  };
  const navigate = useNavigate(); // Utiliza useNavigate para redirigir


  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={"#"}>
            <b>Crea tu</b> Usuario
          </Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">
              Bienvenido, ingrese los datos requeridos para crear un usuario
              nuevo
            </p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="nombre"
                  value={nombre}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                  name="apellido"
                  value={apellido}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirmacion de Contraseña"
                  name="confirmar"
                  value={confirmar}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="social-auth-links text-center mb-3">
                <button type="submit" className="btn btn-block btn-primary">
                  <i /> Registar
                </button>
              </div>
              <Link to={"/"} className="btn btn-block btn-danger">
                <i /> Iniciar Sesión
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearCuenta;
