import React, { useState, useEffect } from "react";
import "../Styles/styleHome.css";
import "../Styles/styleContenedores.css";
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Divider,
  Grid, Menu, MenuItem, TextField,
} from "@mui/material";
import { Button } from "@mui/material";
import { AddAPhoto as AddAPhotoIcon } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CancelIcon from "@mui/icons-material/Cancel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from "react-router-dom";
import Fade from "@mui/material/Fade";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import axios from "axios";

const Home = ({ user }) => {
  const navigate = useNavigate();
  const fotoPerfil = user?.data?.foto_perfil;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [comentarios_texto, setComentarios_texto] = useState(null);
  const [contenido_comentario, setContenido_comentario] = useState("");
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [fotoPublicacion, setFotoPublicacion] = useState(null);
  const [publicaciones, setPublicaciones] = useState(null);
  const [fotoUrl, setFotoUrl] = useState("");
  const [mensaje, setMensaje] = useState(""); 
  const [comentarioAbierto, setComentarioAbierto] = useState(null);
  const est_id = user?.data?.estudiante_id;

  const seleccionarFoto = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setFotoPublicacion(file);
      setFotoUrl(previewUrl);
    }
  };

  const crearPublicacionFoto = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("titulo", titulo);
    formData.append("contenido", contenido);
    formData.append("estudiante_id", user.data.estudiante_id);
    if (!titulo) {
        setMensaje("Por favor complete todos los campos.");
        return;
      } else {
        try {
          const response = await axios.post(
            "http://localhost:1011/estudiantes/publicacion/crear",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.result) {
            const newImageUrl = response.data.imageUrl; 
            setFotoUrl(`data:image/jpeg;base64,${newImageUrl}`);
            setFotoPublicacion(null);
            setTitulo("");
            setContenido("");
            cargarPublicaciones();
          } else {
            setMensaje("Error al publicar la foto");
          }
        } catch (error) {
          setMensaje("Error al publicar la foto");
        }
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
        console.log(userData.data); 
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
        cargarPublicaciones();
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
      console.log(userData.data); 
      cargarReacciones(id);
    } catch (error) {
      console.log("error");
    }
  };
  

  const crearPublicacionTexto = async () => {
    const estudiante_id = user.data.estudiante_id;
    if (!titulo || !contenido) {
      setMensaje("Por favor complete todos los campos.");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:1011/estudiantes/publicaciontxt",
          { titulo, estudiante_id, contenido }
        );
        const userData = response.data.data; 
        console.log(userData.data);
        setTitulo("");
        setContenido("");
        cargarPublicaciones();
      } catch (error) {
        setMensaje("Error al iniciar sesión. Por favor, inténtelo de nuevo.");
      }
    }
  };

  const cargarPublicaciones = () => {
    fetch(
      `http://localhost:1011/estudiantes/publicacion/ver`
    )
      .then((response) => response.json())
      .then((resultado) => {
        setPublicaciones(resultado.data);
      })
      .catch((error) => {
        console.error("Error al cargar la lista de los usuarios:", error);
      });
  };

  const handlePublicar = () => {
    if (!titulo || !contenido) {
      setMensaje("Por favor complete todos los campos.");
      return;
    }
    if (fotoPublicacion) {
      crearPublicacionFoto(fotoPublicacion);
    } else {
      crearPublicacionTexto();
    }
  };

  useEffect(() => {
    cargarPublicaciones();
  }, []);

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
      }
    );
  };

  const eliminarComentario = async (id) => {
    const comentario_id = String(id);
      try {
        const response = await axios.post(`http://localhost:1011/estudiantes/comentario/eliminar/?id=${comentario_id}`);
        const userData = response.data.data; 
        setAnchorEl(null);
        console.log(userData.data);
      } catch (error) {
        console.log("error");
      }
  };
  
  return (
    <div className="contenedor-principal">
      <div className="contenedor-secundario">
        <Grid container spacing={1} style={{ width: "100%" }}>
          <Grid item xs={12} sm={3}>
            <div className="card-news">
              <div className="title-new">
                <h3>Nuevas Noticias</h3>
              </div>
              <div className="contend-card">
                <div className="title-card">
                  <h5>Asistencia</h5>
                </div>
                <div className="p-card">
                  <p>Verifica tu asistencia en el SIUG.</p>
                  <a href="https://servicioenlinea.ug.edu.ec/SIUG/MODULOS/ACADEMICO/ESTUDIANTE/WEB_ESTUDIANTE_CONSULTA_ASISTENCIA.aspx?COD_USERNAME=0956528053&ROL_NAME=ACA-ESTUDIANTE&COD_DETALE_MENU=5">
                    Asistencia
                  </a>
                </div>
              </div>
              <div className="contend-card">
                <div className="title-card">
                  <h5>Calificaciones</h5>
                </div>
                <div className="p-card">
                  <p>Verifica tus calificaciones en el SIUG.</p>
                  <a href="https://servicioenlinea.ug.edu.ec/SIUG/MODULOS/ACADEMICO/ESTUDIANTE/WEB_ESTUDIANTE_CONSULTA_ASISTENCIA.aspx?COD_USERNAME=0956528053&ROL_NAME=ACA-ESTUDIANTE&COD_DETALE_MENU=5">
                    Calificaciones
                  </a>
                </div>
              </div>
              <div className="contend-card">
                <div className="title-card">
                  <h5>Conoce nuevos amigos</h5>
                </div>
                <div className="p-card">
                  <Button
                    fullWidth
                    onClick={() => navigate("/amigos")}
                    sx={{ textTransform: "none" }}
                  >
                    Gente nueva
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            <div className="contend-complete">
              <div className="do-publication">
                <div className="up-area">
                  <h4>Haz una nueva publicación</h4>
                  <h6>Hola, habla Josué Gudiño</h6>
                  {mensaje && (
                  <div className="error-message">
                    <p style={{color: "red"}}>{mensaje}</p>
                  </div>
                )}
                  <div className="icon-profile">
                    <img
                      src={
                        fotoPerfil
                          ? `data:image/jpeg;base64,${fotoPerfil}`
                          : "https://upload.wikimedia.org/wikipedia/commons/6/6d/LogoUGcolor.png"
                      }
                      alt="icono perfil"
                    />
                    <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                            <TextField
                                            variant="filled"
                                            size="small"
                                            placeholder="Escribe un titulo para tu publicación"
                                            type="text"
                                            fullWidth
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                            placeholder="¿En qué estás pensando?"
                                            variant="filled"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            value={contenido}
                                            onChange={(e) => setContenido(e.target.value)}
                                            />
                                        </Grid>
                                        </Grid>   
                  </div>
                  {fotoPublicacion && (
                    <>
                    <Button
                        onClick={() => {
                        setFotoPublicacion(null);  
                        setFotoUrl("");  
                        }}
                        startIcon={<CancelIcon />}
                        style={{ marginLeft: "90%", color: "grey" }}
                    />
                        <img src={fotoUrl} alt="archivo multimedia" style={{ width: "100%", height: "auto" }} />
                    </>
                )}
                  
                </div>               


                <Divider />
                <div className="icon-publication">
                  <AddAPhotoIcon
                    fontSize="small"
                    sx={{ color: "#5A98D0", cursor: "pointer" }}
                    onClick={() => {
                        setMostrarDialogo(true);
                      }}
                  />
                  <Button
                    onClick={handlePublicar}
                    variant="contained"
                    sx={{ backgroundColor: "#5A98D0", marginLeft: "350px" }}
                  >
                    Publicar
                  </Button>
                </div>
              </div>

              {Array.isArray(publicaciones) ? (
                  publicaciones
                    .filter((publica) => publica.estado)
                    .map((publica) => (
                    
                    <div className="publications">
                        <div className="icon-profile">
                            <div className="user-names">
                                <div style={{color:"black"}}><h6>{publica.nombres}</h6></div>
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
                                    fotoPerfil
                                      ? `data:image/jpeg;base64,${fotoPerfil}`
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
                          </div>
                        )}




                        </div>
                      </div>
                    ))): (
                      <div className="publications">
                        No hay publicaciones
                      </div>
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
            <div className="cuadro-seleccion-img">
            {fotoPublicacion && (
                    <>
                    <Button
                        onClick={() => {
                        setFotoPublicacion(null);  
                        setFotoUrl(""); 
                        }}
                        startIcon={<CancelIcon />}
                        style={{ marginLeft: "90%", color: "grey" }}
                    />

                  
                        <img src={fotoUrl} alt="archivo multimedia" style={{ width: "100%", height: "auto" }} />
                    </>
                )}
                    </div>

          </DialogContent>
          <DialogActions>
          {fotoPublicacion && (
            <Button variant="contained" onClick={()=>setMostrarDialogo(false)}>Subir Foto</Button>)
            }
     
            <Button variant="contained" onClick={() => setMostrarDialogo(false)}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

              <Divider />

              <div className="publications">
                
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
