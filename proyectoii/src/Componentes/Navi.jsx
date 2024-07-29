import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import "../Styles/styleNavi.css";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Navi({ user }) { 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const inicial = user.data.nombres.charAt(0);
  const [colorAvatar, setColoravatar] = useState("");
  const navigate = useNavigate();
  const fotoPerfil = user?.data?.foto_perfil;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setColoravatar(generarColorHexAleatorio());
  }, []);

  function generarColorHexAleatorio() {
    const caracteres = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += caracteres[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const acciones = (accion) => {
    (accion === 'home') && navigate('/home');
    (accion === 'comunidad') && navigate('/comunidades');
    (accion === 'notificaciones') && navigate('/notificaciones');
    (accion === 'amigos') && navigate('/amigos');
    (accion === 'perfil') && navigate('/perfil');
    (accion === 'cerrarSesion') && navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid" style={{ backgroundColor: "#065DA2" }}>
        <h2 className="navbar-brand" style={{ color: "white", fontSize: "35px" }}>
          <b>UGRED</b>
        </h2>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Button fullWidth onClick={()=>acciones("home")} style={{color: "white"}} sx={{ textTransform: 'none' }}>Inicio</Button>
            </li>
            <li className="nav-item">
              <Button fullWidth onClick={()=>acciones("amigos")} style={{color: "white"}} sx={{ textTransform: 'none' }}>Gente nueva</Button>
            </li>
          </ul>         
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ color: 'white', marginRight: '15px' }}>
              {user.data.nombres} 
            </span>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2, marginRight: "15px"}}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 40, height: 40, backgroundColor: colorAvatar}}
                src={fotoPerfil ? `data:image/jpeg;base64,${fotoPerfil}` : undefined} >{inicial}</Avatar>
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 50,
                  height: 50,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 20,
                  height: 20,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar />
              <Button fullWidth onClick={()=>acciones("perfil")} sx={{ textTransform: 'none' }}>Perfil</Button>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
            <Button fullWidth onClick={()=>acciones("cerrarSesion")} sx={{ textTransform: 'none' }}>Cerrar Sesion</Button>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navi;
