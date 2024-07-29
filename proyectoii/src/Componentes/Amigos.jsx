import React, { useState, useEffect } from "react";
import "../Styles/styleProfile.css";
import "../Styles/styleContenedores.css";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Divider, TextField } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

function Amigos({user}) {
   const [usuarios, setUsuarios] = useState(null);
   const [nombresBusqueda, setNombresBusqueda] = useState("");
   const [encontrados, setEncontrados] = useState(null);
   const [mensaje, setMensaje] = useState('');
   const [seguido, setSeguido] = useState({}); 
   const navigate = useNavigate();

   const cargarAmigos = () => {
       fetch(`http://192.168.100.114:1011/usuarios/?id=${user.data.estudiante_id}`)
           .then((response) => response.json())
           .then((resultado) => {
               setUsuarios(resultado.data);
           })
           .catch((error) => {
               console.error("Error al cargar la lista de los usuarios:", error);
           });
    };

    useEffect(() => {
        cargarAmigos();
    }, []);

    const handleUserClick = (estudiante_id) => {
        navigate(`/user_profile?estudiante_id=${estudiante_id}`);
    };

    const buscar = async (nombresBusqueda) => {
        const estudiante_nombres = nombresBusqueda;
        try {
            const response = await axios.post('http://192.168.100.114:1011/estudiantes/buscar/', { estudiante_nombres });
            const userData = response.data.data.data;
            setEncontrados(userData);
            setNombresBusqueda("");
        } catch (error) {
            setMensaje('No se ha encontrado parecidos.');
        }
    };

    const seguir = async (seguido_id, estudiante_id, nombres) => {
        try {
            const response = await axios.post('http://192.168.100.114:1011/estudiante/agregar/amigo', { seguido_id, estudiante_id });
            const userData = response.data;
            console.log(userData.data);
            setSeguido(prevState => ({
                ...prevState,
                [seguido_id]: true 
            }));
            setMensaje(`Ahora ${nombres} es tu nuevo amigo. Visita su perfil.`);

        } catch (error) {
            setMensaje('Error al agregar amigo. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div className="contenedor-principal">
            <div className="contenedor-secundario">
                <div className="perfil-portada">
                    <div className="contenido">
                        <TextField
                         variant="filled"
                         size="small"
                         placeholder="Buscar por nombre completo del usuario."
                         type="text"
                         fullWidth
                         value={nombresBusqueda}
                         onChange={(e) => setNombresBusqueda(e.target.value)}
                        >                    
                        </TextField>
                        <Button
                        onClick={()=>buscar(nombresBusqueda)}
                        variant="contained"
                        sx={{ backgroundColor: "#5A98D0", margin: "30px" }}
                        >Buscar</Button>
                        {mensaje && (
                            <Alert severity='primary' color="success">
                                <p style={{fontSize: "20px"}}>{mensaje}</p>
                            </Alert>
                        )}
                        <ul className="lista-mensajes-amigos"  style={{ listStyleType: 'none', padding: 0 }}>
                        {encontrados ? (
                            Array.isArray(encontrados) ? (
                                encontrados.length > 0 ? (
                                encontrados.map((encontrado) => (
                                    <li key={encontrado.estudiante_id}>
                                    <div className="acerca" style={{ backgroundColor: "gray" }}>
                                        <div style={{ fontSize: "25px", paddingLeft: "5px" }} className="usuario-nombre">
                                        <Button onClick={() => handleUserClick(encontrado.estudiante_id)}>
                                            {encontrado.nombres}
                                        </Button>
                                        </div>
                                        <div style={{ fontSize: "15px", paddingLeft: "10px" }} className="usuario-nombre">
                                        <p>{encontrado.usuario}</p>
                                        </div>
                                    </div>
                                    </li>
                                ))
                                ) : (
                                <div></div>
                                )
                            ) : (
                                <li key={encontrados.estudiante_id}>
                                <div className="acerca" style={{ backgroundColor: "lightgray" }}>
                                    <div style={{ fontSize: "25px", paddingLeft: "5px" }} className="usuario-nombre">
                                    <Button onClick={() => handleUserClick(encontrados.estudiante_id)}>
                                        {encontrados.nombres}
                                    </Button>
                                    </div>
                                    <div style={{ fontSize: "15px", paddingLeft: "10px" }} className="usuario-nombre">
                                        <p>{encontrados.usuario}</p>
                                    </div>
                                </div>
                                </li>
                            )
                            ) : (
                            <div></div>
                            )}
                            {usuarios ? (
                                usuarios
                                    .filter(usuario => usuario.estudiante_id !== user.data.estudiante_id)
                                    .map((usuario) => (
                                        <li className="caja_usuario" key={usuario.estudiante_id}>
                                            <div className="acerca">
                                                <div style={{fontSize: "25px", paddingLeft:"5px"}} className="usuario-nombre">
                                                    <Button
                                                        onClick={() => handleUserClick(usuario.estudiante_id)}
                                                    >
                                                        {usuario.nombres}
                                                    </Button>
                                                </div>
                                                <div style={{fontSize: "15px", paddingLeft:"10px"}} className="usuario-nombre">
                                                    <p>{usuario.usuario}</p>
                                                </div>             
                                                <div className="usuario-nombre">
                                                    <Button
                                                        startIcon={seguido[usuario.estudiante_id] ? <HowToRegIcon /> : <PersonIcon />}
                                                        sx={{
                                                            color: seguido[usuario.estudiante_id] ? 'green' : 'gray',
                                                            backgroundColor: seguido[usuario.estudiante_id] ? 'rgba(0, 128, 0, 0.1)' : 'inherit',
                                                            '&:hover': {
                                                                backgroundColor: seguido[usuario.estudiante_id] ? 'rgba(0, 128, 0, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                                                            },
                                                        }}
                                                        onClick={() => seguir(usuario.estudiante_id, user.data.estudiante_id, usuario.nombres)}
                                                    >
                                                        {seguido[usuario.estudiante_id] ? 'Seguido' : 'Seguir'}
                                                    </Button>
                                                    <Divider></Divider>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                            ) : (
                                <li>Cargando usuarios...</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Amigos;
