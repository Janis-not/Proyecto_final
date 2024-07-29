import React, { useState, useEffect } from "react";
import "../Styles/styleProfile.css";
import "../Styles/styleContenedores.css";
import { useNavigate } from "react-router-dom";
import {  Button,  Grid,  Dialog,  DialogActions,  DialogContent,  DialogTitle,
  TextField,  Menu,  MenuItem,  Divider,
} from "@mui/material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplayIcon from '@mui/icons-material/Replay';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Fade from "@mui/material/Fade";
import axios from "axios";

function Profile({ user }) {
  const [currentSection, setCurrentSection] = useState("publicaciones");
  const [amigos, setAmigos] = useState(null);
  const [editar, setEditar] = useState(false);
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [usuario, setUsuario] = useState("");
  const [nombres, setNombres] = useState("");
  const [correo, setCorreo] = useState("");
  const [intereses, setIntereses] = useState("");
  const [publicaciones, setPublicaciones] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoUrl, setFotoUrl] = useState(user.data.foto_perfil || "");
  const [comentar, setComentar] = useState(false);
  const [comentarioAbierto, setComentarioAbierto] = useState(null);
  const [comentarios_texto, setComentarios_texto] = useState(null);
  const [contenido_comentario, setContenido_comentario] = useState("");
  const est_id = user?.data?.estudiante_id;

  const acciones = (accion) => {
    setCurrentSection(accion);
    (accion === 'comentar') && setComentar(true);
    if (accion === "editar") {
      setEditar(true);
      setUsuario(user.data.usuario);
      setNombres(user.data.nombres);
      setCorreo(user.data.correo);
      setIntereses(user.data.intereses);
      setFotoUrl(user.data.foto_perfil);
    }
  };

  const seleccionarFoto = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setFotoPerfil(file);
      setFotoUrl(previewUrl); 
      cargarFotoPerfil(file); 
    }
    setMostrarDialogo(false);
  };

  const cargarFotoPerfil = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("estudiante_id", user.data.estudiante_id);
    try {
      const response = await axios.post(
        "http://localhost:1011/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate('/', { state: { success: `Algunos iconos de su foto de perfil siguen cambiando, inicie sesión nuevamente.` } });
      if (response.data.result) {
        setMensaje("Foto de perfil actualizada con éxito");
        console.log(mensaje);
        const newImageUrl = response.data.imageUrl; 
        setFotoUrl(`data:image/jpeg;base64,${newImageUrl}`);
        setFotoPerfil(null); 
      } else {
        setMensaje("Error al subir la foto de perfil");
      }
    } catch (error) {
      setMensaje("Error al subir la foto de perfil");
    }
  };

  const vercomentarios = (publicacion_id) => {
    setComentarioAbierto(publicacion_id);
    cargarComentarios(publicacion_id);
  }

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
    fetch(
      `http://localhost:1011/estudiantes/ver/amigo/?id=${user.data.estudiante_id}`
    )
      .then((response) => response.json())
      .then((resultado) => {
        setAmigos(resultado.data);
      })
      .catch((error) => {
        console.error("Error al cargar la lista de los usuarios:", error);
      });
  };

  const editarPerfil = async () => {
    try {
      const estudiante_id = String(user.data.estudiante_id);
      const response = await axios.put(
        `http://192.168.100.114:1011/estudiantes/editar/?id=${estudiante_id}`,
        { usuario, nombres, correo, intereses }
      );
      const userData = response.data.data;
      console.log(userData);
      navigate("/", {
        state: {
          success:
            "Varios de sus datos han sido actualizados, recomendamos que inicie sesión nuevamente.",
        },
      });
    } catch (error) {
      setMensaje("Error al iniciar sesión. Por favor, inténtelo de nuevo.");
    }
  };

  useEffect(() => {
    cargarAmigos();
    cargarPublicacionesUsuario();
  }, [fotoUrl]); 

  const handleUserClick = (estudiante_id) => {
    navigate(`/user_profile?estudiante_id=${estudiante_id}`);
  };

  const cargarPublicacionesUsuario = () => {
    const estudiante_id = String(user.data.estudiante_id);
    fetch(
      `http://localhost:1011/estudiantes/publicacion/usuario/ver/?id=${estudiante_id}`
    )
      .then((response) => response.json())
      .then((resultado) => {
        setPublicaciones(resultado.data);
      })
      .catch((error) => {
        console.error("Error al cargar la lista de los usuarios:", error);
      });
  };

  const eliminarPublicacionesUsuario = async (id) => {
    const publicacion_id = String(id);
      try {
        const response = await axios.put(`http://localhost:1011/estudiantes/publicacion/eliminar/?id=${publicacion_id}`);
        const userData = response.data.data; 
        setAnchorEl(null);
        console.log(userData);
        cargarPublicacionesUsuario();
      } catch (error) {
        console.log("error");
      }
  };

  const handleClickPublicacion = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePublicacion = () => {
    setAnchorEl(null);
  };

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
          <div className="perfil-user">
            <Grid container spacing={1} style={{ width: "100%" }}>
              <Grid item xs={12} sm={3}>
                <div
                  className="foto-perfil"
                  onClick={() => {
                    setMostrarDialogo(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {fotoUrl ? (
                    <img src={`data:image/jpeg;base64,${fotoUrl}`} alt="icono perfil" />
                  ) : (
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/LogoUGcolor.png" alt="icono perfil" />
                  )}
                  <div className="nombre-user">
                    <h4>{user.data.nombres}</h4>
                    <p>{user.data.usuario}</p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Grid item xs={6} sm={12}>
                  <div className="btn-editar-perfil">
                    <Button
                      variant="contained"
                      onClick={() => acciones("editar")}
                    >
                      Editar perfil
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={6} sm={12}>
                  <div className="btns-opciones">
                    <Button
                      style={{ marginRight: "10px", color: "gray" }}
                      startIcon={<PermMediaIcon />}
                      onClick={() => acciones("publicaciones")}
                    ></Button>
                    <Button
                      style={{ marginRight: "10px", color: "gray" }}
                      startIcon={<PeopleIcon />}
                      onClick={() => acciones("amigos")}
                    ></Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>
                  
          <div className="contenido">
            {currentSection === "publicaciones" && (
              <Grid container spacing={1} style={{ width: "100%" }}>
                <Grid item xs={12} sm={4}>
                  <div className="about">
                    <Grid item xs={3} sm={12}>
                      <div className="detalles">
                        <h6>Acerca de mí</h6>
                        <p>{user.data.intereses}</p>
                      </div>
                    </Grid>
                    <Grid item xs={3} sm={12}>
                      <div className="detalles">
                        <h6>Estudio</h6>
                        <p>{user.data.carrera} en</p>
                        <p>{user.data.facultad}</p>
                      </div>
                    </Grid>
                    <Grid item xs={3} sm={12}>
                      <div className="detalles">
                        <h6>Mi correo es</h6>
                        <p>{user.data.correo}</p>
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
                                <div className="in-comments" style={{display: "inline-block", marginLeft: "200px"}}>
                                  <Button style={{ color: "#888" }} startIcon={<MoreVertIcon />}     
                                    aria-controls={open ? 'fade-menu' : undefined} aria-haspopup="true" 
                                    aria-expanded={open ? 'true' : undefined} onClick={handleClickPublicacion}/>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                        }} anchorEl={anchorEl} open={open} onClose={handleClosePublicacion} TransitionComponent={Fade}
                                    >
                                      <MenuItem onClick={() => eliminarPublicacionesUsuario(publica.publicacion_id)}>Eliminar Publicacion</MenuItem>
                                   </Menu> 
                                </div>
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
                              <div className="contend-publication"></div>
                              )
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
                                <Button style={{color: "white"}} onClick={() => vercomentarios(publica.publicacion_id)} startIcon={<ChatBubbleIcon />}>Comentar</Button>
                            </div>
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
            {currentSection === "amigos" && (
              <ul className="lista-mensajes-amigos" style={{ listStyleType: 'none', padding: 0 }}>
                {Array.isArray(amigos) ? (
                  amigos
                    .filter((amigo) => amigo.estado)
                    .map((amigo) => (
                      <li className="caja_usuario" key={amigo.estudiante_id}>
                        <div className="acerca">
                          <div style={{fontSize: "25px", paddingLeft:"5px"}}  className="usuario-nombre">
                            <Button
                              onClick={() =>
                                handleUserClick(amigo.estudiante_id)
                              }
                            >
                              {amigo.nombres}
                            </Button>
                          </div>
                          <div style={{fontSize: "15px", paddingLeft:"10px"}} className="usuario-nombre">
                            <p>{amigo.usuario}</p>
                            <Divider></Divider>
                          </div>
                        </div>
                      </li>
                    ))
                ) : (
                  <li>
                    No tienes nuevos amigos, suferimos que conozcas gente
                    nueva...
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
        {editar && (
          <Dialog open={editar} onClose={() => setEditar(false)}>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogContent>
              <div className="panel-contrasena">
                <div className="mensaje">{mensaje && <p>{mensaje}</p>}</div>
                <TextField
                  label="Usuario"
                  variant="filled"
                  size="small"
                  placeholder="Escriba un usuario"
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
                <TextField
                  label="Nombres"
                  variant="filled"
                  size="small"
                  placeholder="Escriba su nombre completo"
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
                <TextField
                  label="Intereses"
                  variant="filled"
                  multiline
                  rows={4}
                  value={intereses}
                  onChange={(e) => setIntereses(e.target.value)}
                  fullWidth
                />
                <br />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={editarPerfil}
                disabled={!usuario || !nombres || !correo || !intereses}
              >
                Editar
              </Button>
              <Button variant="contained" onClick={() => setEditar(false)}>
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Dialog open={mostrarDialogo} onClose={() => setMostrarDialogo(false)}>
          <DialogTitle>Seleccionar Foto</DialogTitle>
          <DialogContent>
            <input
              className="cuadro-imagenes"
              type="file"
              accept="image/*"
              onChange={seleccionarFoto}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setMostrarDialogo(false)}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Profile;
