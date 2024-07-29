import React, { useState } from "react";
import "../Styles/styleRecuperacion.css";
import "../Styles/styleContenedores.css";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Recuperacion() { 
  const [contrasenia, setContrasenia] = useState('');
  const [correo, setCorreo] = useState('');
  const [recuperar, setRecuperar] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handlerecuperar = async () => {
    if (!contrasenia) {
      setMensaje('Por favor complete el campo para establecer su contraseña.');
      return;
    } else {
      try {
        const response = await axios.put(`http://192.168.100.114:1011/estudiantes/recuperar/ps`, {contrasenia, correo});
        const userData = response.data.data; 
        console.log(userData);
        navigate('/', { state: { success: `Su contraseña ha sido reestablecida, inicie sesión.` } });

      } catch (error) {
        setMensaje('Algo salió mal, inténtalo nuevamente.');
      }
    }
  };

  const acciones = (accion) => {
    (accion === 'cancelar') && navigate('/');
    (accion === 'recuperar') && setRecuperar(true);
  };

  return (
    <div className="contenedor-principal">
        <div className="contenedor-secundario">
            <Grid container spacing={0} style={{ width: "100%" }}>
                <Grid item xs={12} sm={12}>
                    <div className="panel-recuperar">
                        <h3>Recupere su contraseña</h3>
                        <div className="etiquetas"><h6>Escriba su correo electrónico para poder recuperar su contraseña.</h6></div>
                        <TextField
                            id="filled-hidden-label-small"
                            variant="filled"
                            size="small"
                            placeholder="Escriba su nombre de usuario"
                            type="text"
                            value={correo} 
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                        <br></br>
                        <div className="botones">
                            <Button variant="contained" style={{ marginRight: "10px"}} 
                                onClick={() => acciones('recuperar')} disabled={!correo} >Recuperar</Button>
                            <Button variant="contained" onClick={() => acciones('cancelar')}>Cancelar</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            {recuperar && (
            <Dialog open={recuperar} onClose={() => setRecuperar(false)}>
                <DialogTitle>Recuperar Contraseña</DialogTitle>
                <DialogContent>
                    <div className="panel-contrasena">
                        <p>Ingrese su nueva contraseña para reestablecerla.</p>
                        <div className="mensaje">
                            {mensaje && (<p>{mensaje}</p>)}
                        </div>
                        <TextField
                            id="filled-hidden-label-small" 
                            variant="filled"
                            size="small"
                            placeholder="Escriba su nueva contraseña"
                            type="text"
                            value={contrasenia} 
                            onChange={(e) => setContrasenia(e.target.value)}
                        />
                        <br></br>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handlerecuperar}>Recuperar</Button>
                    <Button variant="contained" onClick={()=>setRecuperar(false)}>Cerrar</Button>
                </DialogActions>
            </Dialog>)}
        </div>
    </div>
  );
}

export default Recuperacion;
