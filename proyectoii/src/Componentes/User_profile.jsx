import React, { useState, useEffect } from "react";
import "../Styles/styleProfile.css";
import { Button, Grid, TextField, Menu, MenuItem, Divider,} from "@mui/material";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import ReplayIcon from '@mui/icons-material/Replay';
import Fade from "@mui/material/Fade";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

function User_profile({user}) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('estudiante_id');
    const [amigos, setAmigos] = useState(null);
    const [amistad, setAmistad] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [fotoUrl, setFotoUrl] = useState(null);
    const [publicaciones, setPublicaciones] = useState(null);
    const [currentSection, setCurrentSection] = useState('publicaciones');

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [comentar, setComentar] = useState(false);

    const [comentarioAbierto, setComentarioAbierto] = useState(null);
    const [comentarios_texto, setComentarios_texto] = useState(null);
    const [contenido_comentario, setContenido_comentario] = useState("");
    const est_id = user?.data?.estudiante_id;

    const navigate = useNavigate();

    const acciones = (accion) => {
        setCurrentSection(accion);        
    };

    const cargarUsuario = () => {
        fetch(`http://192.168.100.114:1011/estudiantes/cuentas/?id=${id}`)
            .then((response) => response.json())
            .then((resultado) => {
                setUsuario(resultado.data[0]); 
            })
            .catch((error) => {
                console.error("Error al Cargar la lista de los usuarios:", error);
            });
    };

    const crearReaccion = async (id) => {
      const publicacion_id = String(id);
      const estudiante_id = String(user.data.estudiante_id);
        try {
          const response = await axios.post(`http://localhost:1011/estudiantes/reaccion/`,{estudiante_id, publicacion_id});
          const userData = response.data.data; 
          cargarReacciones(id);
        } catch (error) {
          console.log("error");
        }
    };
  
    const cargarReacciones = (id) => {
      const publicacion_id = String(id);
      fetch(
        `http://localhost:1011/ver/reaccion/?id=${publicacion_id}`
      )
        .then((response) => response.json())
        .then((resultado) => {
          cargarPublicacionesUsuario();
          console.log(resultado.data);
        })
        .catch((error) => {
          console.error("Error al cargar la lista de los usuarios:", error);
        });
      };
    
      const eliminarReacciones = async (id) => {
        const publicacion_id = String(id);
        const estudiante_id = String(user.data.estudiante_id);
        try {
          const response = await axios.post(`http://localhost:1011/estudiantes/reaccion/eliminar`,{estudiante_id, publicacion_id});
          const userData = response.data.data; 
          cargarReacciones(id);
        } catch (error) {
          console.log("error");
        }
      };

    const cargarAmigos = () => {
        fetch(`http://localhost:1011/estudiantes/ver/amigo/?id=${id}`)
            .then((response) => response.json())
            .then((resultado) => {
                setAmigos(resultado.data);
            })
            .catch((error) => {
                console.error("Error al cargar la lista de los usuarios:", error);
            });
    };

    const eliminaramigo = async (amigo_id) => {
          try {
            const response = await axios.put(`http://localhost:1011/estudiantes/eliminar/amigo/?id=${amigo_id}`);
            setAmistad(null);
          } catch (error) {
            console.log("error");
          }
      };

     const verificarAmistad = async () => {
        const estudiante_id = String(user.data.estudiante_id);
        const seguido_id = String(id);
          try {
            const response = await axios.post('http://localhost:1011/estudiantes/verificar/amistad/', {estudiante_id, seguido_id });
            const userData = response.data.data; 
            setAmistad(userData.data); 
          } catch (error) {
            console.log("error");
          }
      };

      const verFoto = async () => {
        if (!usuario) {
          return; 
        }
        const estudiante_id = String(usuario.estudiante_id);
          try {
            const response = await axios.post('http://localhost:1011/ver/foto/usuario', {estudiante_id });
            const userData = response.data.data; 
            setFotoUrl(userData.data); 
          } catch (error) {
            console.log("error");
          }
      };
    
    useEffect(() => {
        if (id) {
            cargarUsuario();
            cargarAmigos();
            verificarAmistad();
        }
    }, [id]);

    const cargarPublicacionesUsuario = () => {
        fetch(
          `http://localhost:1011/estudiantes/publicacion/usuario/ver/?id=${id}`
        )
          .then((response) => response.json())
          .then((resultado) => {
            setPublicaciones(resultado.data);
          })
          .catch((error) => {
            console.error("Error al cargar la lista de los usuarios:", error);
          });
      };

    useEffect(() => {
        if (usuario) {
            verFoto();
            cargarPublicacionesUsuario();
        }
    }, [usuario]);

    if (!usuario) {
        return <div>Cargando información del usuario...</div>;
    }

    const handleUserClick = (estudiante_id) => {
        navigate(`/user_profile?estudiante_id=${estudiante_id}`);
    };

    const vercomentarios = (publicacion_id) => {
        setComentarioAbierto(publicacion_id);
        cargarComentarios(publicacion_id);
      }

      const handleClickComentario = (event) => {
        setAnchorEl(event.currentTarget);
      };
      
      const handleCloseComentario = () => {
        setAnchorEl(null);
      };

      const publicarComentario = async (id, contenido_comentario ) => {
        const estudiante_id = user.data.estudiante_id;
        const publicacion_id = id;
        const contenido = contenido_comentario;
          try {
            const response = await axios.post(`http://localhost:1011/estudiantes/comentario`,{estudiante_id, publicacion_id, contenido});
            const userData = response.data.data; 
            setComentar(false);
            console.log(userData);
            cargarComentarios(publicacion_id);
            setContenido_comentario("");
          } catch (error) {
            console.log("error");
          }
      };
      
      const cargarComentarios = (id) => {
        const publicacion_id = String(id);
        fetch(
          `http://localhost:1011/estudiantes/comentario/ver/?id=${publicacion_id}`
        )
          .then((response) => response.json())
          .then((resultado) => {
            setComentarios_texto(resultado.data);
            console.log(resultado.data);
          })
          .catch((error) => {
            console.error("Error al cargar la lista de los usuarios:", error);
          });
        };
      
        const eliminarComentario = async (id) => {
          const comentario_id = String(id);
            try {
              const response = await axios.post(`http://localhost:1011/estudiantes/comentario/eliminar/?id=${comentario_id}`);
              const userData = response.data.data; 
              setAnchorEl(null);
              console.log(userData);
            } catch (error) {
              console.log("error");
            }
        };

    return (
        <div className="contenedor-principal">
            <div className="contenedor-secundario">
                <div className="perfil-portada">
                <div>
                    <Button 
                        style={{ marginRight: "10px", color: "gray"}} 
                        onClick={() => navigate('/home')}
                        startIcon={<ArrowBackIcon />} >
                    </Button>
                 </div>
                    <div className="perfil-user">
                        <Grid container spacing={1} style={{width: "100%"}}>
                            <Grid item xs={12} sm={3}>
                                <div className="foto-perfil">
                                    {fotoUrl ? (
                                        <img src={`data:image/jpeg;base64,${fotoUrl.foto_perfil}`} alt="icono perfil" />
                                    ) : (
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/LogoUGcolor.png" alt="icono perfil" />
                                    )}
                                    <div className="nombre-user">
                                        <h4>{usuario.nombres}</h4>
                                        <p>{usuario.usuario}</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                            <Grid item xs={6} sm={12}>
                                    <div className="btn-editar-perfil">
                                    <Button
                                        variant="contained"
                                        onClick={() => eliminaramigo(amistad.amigo_id)}
                                        >
                                        {amistad && amistad.estado ? "Dejar de Seguir" : " "}
                                    </Button>
                                    </div>
                                </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <div className="btns-opciones">
                                            <Button 
                                                style={{ marginRight: "10px", color: "gray" }} 
                                                startIcon={<PermMediaIcon />} 
                                                onClick={() => acciones("publicaciones")}
                                            />
                                            <Button 
                                                style={{ marginRight: "10px", color: "gray" }} 
                                                startIcon={<PeopleIcon />} 
                                                onClick={() => acciones("amigos")}
                                            />
                                        </div>
                                    </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="contenido">
                        {currentSection === 'publicaciones' && (
                            <Grid container spacing={1} style={{width: "100%"}}>
                                <Grid item xs={12} sm={4}>
                                    <div className="about">
                                        <Grid item xs={12}>
                                            <div className="detalles">
                                                <h6>Acerca de mí</h6>
                                                <p>{usuario.intereses}</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="detalles">
                                                <h6>Estudio</h6>
                                                <p>{usuario.carrera} en</p>
                                                <p>{usuario.facultad}</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="detalles">
                                                <h6>Mi correo es</h6>
                                                <p>{usuario.correo}</p>
                                            </div>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                {Array.isArray(publicaciones) ? (
                                publicaciones
                                    .filter((publica) => publica.estado)
                                    .map((publica) => (
                                    <div className="publications">
                                        <div className="icon-profile">
                                        
                                            <div className="user-names">
                                                <div style={{color:"black", display: "inline-block"}}><h6>{publica.nombres}</h6></div>
                                                <div style={{color:"black"}}><p style={{fontSize:"11px"}}>{publica.fecha}  {publica.hora} </p></div>
                                                <div style={{color:"black"}}><h5>{publica.titulo}</h5></div>
                                            </div>
                                        </div>
                                        <div className="detalles-publication">
                                            {publica.contenido ? (
                                            <div className="contend-publication">
                                                {publica.contenido}
                                            </div>
                                            ):(
                                            <div className="contend-publication">
                                                
                                            </div>)
                                            }
                                        {publica.imagen ? (
                                        <div className="image-publication" style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img 
                                            src={`data:image/jpeg;base64,${publica.imagen}`} 
                                            alt="imágenes subidas" 
                                            />
                                        </div>
                                        ) : (
                                        <div className="image-publication">
                                        </div>
                                        )}
                                            <div className="actions">
                                                <Button style={{color: "white"}} onClick={() => crearReaccion(publica.publicacion_id)} startIcon={<FavoriteIcon />}>Me gusta {publica.total_reacciones}</Button>
                                                <Button style={{color: "white"}} onClick={() => eliminarReacciones(publica.publicacion_id)} startIcon={<ThumbDownOffAltIcon />}>No Me gusta</Button>
                                                <Button style={{color: "white"}} onClick={() => vercomentarios(publica.publicacion_id)} startIcon={<ChatBubbleIcon />}>Comentar</Button>                                            </div>

                                            {comentarioAbierto === publica.publicacion_id && (
                          <div className="comments">
                            <div className="comments-others"> 
                              <div>
                                {Array.isArray(comentarios_texto) ? (
                                  comentarios_texto
                                    .filter((coment) => coment.estado)
                                    .map((coment, index) => (
                                      <div
                                        key={index}
                                        className="only-comment"
                                        style={{
                                          width: "100%",
                                          background: "#f0f0f0",
                                          display: "block",
                                          padding: "10px",
                                          marginBottom: "10px",
                                          borderRadius: "5px",
                                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontWeight: "bold",
                                            color: "#333",
                                            marginBottom: "5px",
                                            display: "inline-block",
                                          }}
                                        >
                                          {coment.nombres}
                                          {coment.estudiante_id === est_id && (
                                            <>
                                          <Button style={{ color: "#888", marginLeft: "180px" }} startIcon={<MoreVertIcon />}     
                                            aria-controls={open ? 'fade-menu' : undefined} aria-haspopup="true" 
                                            aria-expanded={open ? 'true' : undefined} onClick={handleClickComentario}/>
                                            <Menu
                                                id="fade-menu"
                                                MenuListProps={{
                                                'aria-labelledby': 'fade-button',
                                                }} anchorEl={anchorEl} open={open} onClose={handleCloseComentario} TransitionComponent={Fade}
                                            >
                                              <MenuItem onClick={() => eliminarComentario(coment.comentario_id)}>Eliminar Comentario</MenuItem>
                                          </Menu> 
                                          </>
                                         )}
                                        </div>
                                        
                                        <div style={{ fontSize: "14px", color: "#555" }}>
                                          {coment.contenido}
                                        </div>
                                      </div>
                                    ))
                                ) : (
                                  <div style={{margin: "6px", color: "gray"}}>Aún no hay comentarios, sé el primero en comentar.</div>
                                )}
                                    </div>
                                </div>
                                <Divider></Divider>
                            <div className="comments-user">
                              <div className="icon-profile">
                                <img
                                  src={
                                    fotoUrl
                                      ? `data:image/jpeg;base64,${fotoUrl}`
                                      : "https://upload.wikimedia.org/wikipedia/commons/6/6d/LogoUGcolor.png"
                                  }
                                  alt="icono perfil"
                                />
                                <div className="only-comment">
                                  <div>{user.data.nombres}</div>
                                  <TextField
                                    placeholder="Comenta algo interesante."
                                    variant="filled"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={contenido_comentario}
                                    onChange={(e) => setContenido_comentario(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="btn-comentarios" style={{ display: "flex", gap: "10px" }}>
                                <Button 
                                  variant="contained" 
                                  color="primary" 
                                  style={{ fontSize: "10px"}}
                                  onClick={() => publicarComentario(publica.publicacion_id, contenido_comentario)}
                                >
                                  Subir Comentario
                                </Button>
                                <Button 
                                  variant="contained" 
                                  color="error" 
                                  style={{ fontSize: "10px"}}
                                  onClick={() => setComentarioAbierto(null)}
                                >
                                  Cancelar
                                </Button>
                                <Button 
                                  variant="contained" 
                                  color="success" 
                                  startIcon={<ReplayIcon/>}
                                  style={{ fontSize: "10px"}}
                                  onClick={() => cargarComentarios(publica.publicacion_id)}
                                >
                                </Button>
                                </div>
                                </div>
                            </div>)}
                                        </div>
                                    </div>
                                    ))): (
                                    <div className="publications">
                                    No hay publicaciones
                                </div>
                                )}
                                </Grid>
                            </Grid>
                        )}
                        {currentSection === 'amigos' && (
                            <ul className="lista-mensajes-amigos">
                                {Array.isArray(amigos) ? (
                                amigos.filter(amigo => amigo.estado).map(amigo => (
                                <li className="caja_usuario" key={amigo.estudiante_id}>
                                    <div className="acerca">
                                    <div className="usuario-nombre">
                                    <Button
                                        sx={{ textTransform: 'none' }}
                                        onClick={() => handleUserClick(amigo.estudiante_id)}
                                    >
                                        {amigo.nombres}
                                    </Button>
                                    </div>
                                    <div className="usuario-nombre">
                                      <p>{amigo.usuario}</p>
                                    </div>
                                    </div>
                                  </li>
                                 ))
                               ) : (
                              <li>No tiene nuevos amigos, sugierele que conozca gente nueva...</li>
                              )}
                           </ul>
                           )}
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default User_profile;
