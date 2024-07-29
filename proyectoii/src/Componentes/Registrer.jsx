import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/styleRegistrer.css";
import "../Styles/styleContenedores.css";
import { Button, FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registrer() {
  const navigate = useNavigate();
  const [facultades, setFacultades] = useState(null); 
  const [carreras, setCarreras] = useState([]); 
  const [facultad, setFacultad] = useState(0); 

  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [nombres, setNombres] = useState("");
  const [carrera_id, setCarrera_id] = useState(0); 
  const [correo, setCorreo] = useState("");
  const [intereses, setIntereses] = useState("");

  const [mensaje, setMensaje] = useState(""); 

  const handleRegistrer = async () => {
    if (!usuario || !contrasenia || !nombres || !carrera_id || !correo || !intereses) {
      setMensaje('Por favor complete todos los campos.');
      return;
    } else {
      try {
        const response = await axios.post('http://192.168.100.114:1011/registro/estudiante', { usuario, 
          contrasenia, nombres, carrera_id, correo, intereses});
        const userData = response.data.data; 
        console.log(userData);   
        navigate('/', { state: { success: `Su cuenta ha sido creada con éxito, inicie sesión.` } });

      } catch (error) {
        setMensaje('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
      }
    }
  };

  const cargarFacultades = () => {
      fetch('http://192.168.100.114:1011/facultades/')
      .then(response => response.json())
      .then(resultado => {
          console.log(resultado); 
              setFacultades(resultado.data);
      })
      .catch(error => {
          console.error('Error al Cargar la lista de los facultades:', error);
    });
  };

  const cargarCarreras = async () => {
        fetch(`http://192.168.100.114:1011/carreras/?id=${facultad}`)
        .then(response => response.json())
        .then(resultado => {
            console.log(resultado); 
                setCarreras(resultado.data);
        })
        .catch(error => {
            console.error('Error al Cargar la lista de los facultades:', error);
      });
  };

  useEffect(() => {
      cargarFacultades();
  }, []);

  useEffect(() => {
    if (facultad) {
      cargarCarreras();
    } else {
      setCarreras([]); 
    }
  }, [facultad]);

  return (
    <div className="contenedor-principal">
      <div className="contenedor-secundario">
        <Grid container spacing={0} style={{ width: "100%" }}>
          <Grid item xs={12} sm={6}>
            <div className="panel-acceder">
              <h3 style={{ color: "#ffff" }}>¡Bienvenido a UGRED!</h3>
              <p style={{ color: "#ffff" }}>
                Mantente conectado con nosotros, ingresa a tu cuenta nuevamente.
              </p>
              <Button variant="contained" fullWidth onClick={() => navigate('/')}>
                Acceder
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="panel-crear-user">
              <Grid item xs={2} sm={12} style={{width: "100%"}}>
              <h4>Crear Cuenta</h4>
                <div className="mensaje">
                  {mensaje && (<p>{mensaje}</p>)}
                </div>
              </Grid>
              <Grid item xs={2} sm={12} style={{width: "100%"}}>
                  <TextField
                    label="Nombres"
                    variant="filled"
                    size="small"
                    placeholder="Escriba su nombre"
                    type="text"
                    fullWidth
                    value={nombres} 
                    onChange={(e) => setNombres(e.target.value)}
                    InputProps={{
                      style: {
                        height: 50, 
                        paddingBottom: 5, 
                        marginBottom: 5,
                        fontSize: 15,
                      },
                    }}
                  />
              </Grid >
              <Grid container spacing={1}  xs={2} sm={12} style={{width: "100%"}}>
                <Grid item xs={12} sm={6}>
                      <TextField
                        label="Usuario"
                        variant="filled"
                        size="large"
                        placeholder="Escriba su usuario"
                        type="text"
                        fullWidth
                        value={usuario} 
                        onChange={(e) => setUsuario(e.target.value)}
                        InputProps={{
                          style: {
                            height: 50, 
                            paddingBottom: 5, 
                            marginBottom: 5,
                            fontSize: 15,
                          },
                        }}
                      />
                </Grid>
                <Grid item xs={12} sm={6}> 
                    <TextField
                  label="Contraseña"
                    variant="filled"
                    size="large"
                    placeholder="Escriba su contraseña"
                    type="password"
                    fullWidth
                    value={contrasenia} 
                    onChange={(e) => setContrasenia(e.target.value)}
                    InputProps={{
                      style: {
                        height: 50, 
                        paddingBottom: 5, 
                        marginBottom: 5,
                        fontSize: 15,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={2} sm={12} style={{width: "100%"}}>
                      <TextField
                        label="Correo"
                        variant="filled"
                        size="small"
                        placeholder="Escriba un correo"
                        type="email"
                        fullWidth
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)}
                        InputProps={{
                          style: {
                            height: 50, 
                            paddingBottom: 5, 
                            marginBottom: 5,
                            fontSize: 15,
                          },
                        }}
                      />
              </Grid>
              <Grid item xs={2} sm={12} style={{width: "100%"}}>
                <FormControl variant="filled" fullWidth className="selects" style={{ marginBottom: '5px', marginTop: '2px' }}>
                Seleccione su facultad.
                  <Select
                    value={facultad}
                    onChange={(e) => setFacultad(e.target.value)}
                    inputProps={{
                      style: {
                        height: 50,
                        paddingBottom: 5,
                        fontSize: 15,
                      },
                    }}
                  >                 

                    {facultades && facultades.map((objeto) => (
                      <MenuItem key={objeto.facultad_id} value={objeto.facultad_id}>
                        {objeto.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} sm={12} style={{width: "100%"}}>
              <FormControl variant="filled" fullWidth className="selects" style={{ marginBottom: '10px' }}>
              Seleccione su carrera.
                <Select
                  value={carrera_id}
                  onChange={(e) => setCarrera_id(e.target.value)}
                  inputProps={{
                    style: {
                      height: 50,
                      paddingBottom: 5,
                      fontSize: 15,
                    },
                  }}
                >
                  {carreras.length > 0 ? (
                    carreras.map((objeto) => (
                      <MenuItem key={objeto.carrera_id} value={objeto.carrera_id}>
                        {objeto.nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>No hay carreras disponibles</MenuItem>
                  )}
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={2} sm={12} style={{width: "100%"}}>
              <TextField
                label="Intereses"
                variant="filled" 
                multiline
                rows={4} 
                value={intereses}
                onChange={(e) => setIntereses(e.target.value)}
                fullWidth
              />
              </Grid>
              <Button style={{marginTop: "5px"}} variant="contained" onClick={handleRegistrer}>
                Crear
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Registrer;



