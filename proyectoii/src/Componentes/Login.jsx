import React, { useState, useEffect } from "react";
import "../Styles/styleLogin.css";
import "../Styles/styleContenedores.css";
import { Alert, Button, Grid, TextField} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser }) { 
  const [login_user, setUsuario] = useState('');
  const [login_password, setContrasenia] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state ? location.state.success : null;

  const handleLogin = async () => {
    if (!login_user || !login_password) {
      setMensaje('Por favor complete todos los campos.');
      return;
    } else {
      try {
        const response = await axios.post('http://192.168.100.114:1011/estudiantes/login', { login_user, login_password });
        const userData = response.data.data; 
        setUser(userData); 
        navigate('/home');

      } catch (error) {
        setMensaje('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
      }
    }
  };

  useEffect(() => {
    setUser(null);
  }, []);

  const acciones = (accion) => {
    (accion === 'registrer') && navigate('/registrer');
    (accion === 'recuperar') && navigate('/recuperacion');
  };

  return (
    <div className="contenedor-principal">
        <div className="contenedor-secundario">
            <Grid container spacing={0} style={{ width: "100%" }}>
                <Grid item xs={12} sm={6}>
                    <div className="panel-login">
                      {successMessage && (<Alert severity='success' color="success">
                        <p style={{fontSize: "15px"}}>{successMessage}</p>
                      </Alert>)}
                        <h3>Inicio de Sesión</h3>
                        <div className="mensaje">
                            {mensaje && (<p>{mensaje}</p>)}
                        </div>
                        <div className="etiquetas"><h6>Usuario:</h6></div>
                        <TextField
                            id="filled-hidden-label-small"
                            variant="filled"
                            size="small"
                            placeholder="Escriba su nombre de usuario"
                            type="text"
                            value={login_user} 
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                        <div className="etiquetas"><h6>Contraseña:</h6></div>
                        <TextField
                            id="filled-hidden-label-small"
                            variant="filled"
                            size="large"
                            placeholder="Escriba su contraseña"
                            type="password"
                            value={login_password} 
                            onChange={(e) => setContrasenia(e.target.value)}
                        />
                        <div className="recuperacion">
                            <Button onClick={() => acciones("recuperar")} sx={{ textTransform: 'none' }}>
                            ¿Has olvidado tu contraseña?
                            </Button>
                        </div>
                        <br></br>
                        <Button variant="contained" onClick={handleLogin}>Entrar</Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className="panel-registrar">
                        <h3 style={{color: "#ffff"}}>¡Bienvenido a UGRED!</h3>
                        <p style={{color: "#ffff"}}>Ingresa tus datos personales para crear una cuenta nueva.</p>
                        <Button variant="contained" fullWidth onClick={()=>acciones("registrer")}>
                            Suscribirse
                        </Button>
                    </div>
                </Grid>
                </Grid>
        </div>
    </div>
  );
}

export default Login;
