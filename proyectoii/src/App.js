import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Componentes/Login";
import Registrer from "./Componentes/Registrer";
import Navi from "./Componentes/Navi";
import Home from "./Componentes/Home";
import Profile from "./Componentes/Profile";
import Recuperacion from "./Componentes/Recuperacion";
import Amigos from "./Componentes/Amigos";
import User_profile from "./Componentes/User_profile"

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {user && <Navi user={user} />}
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/registrer" element={<Registrer />} />
        <Route path="/home" element={<Home user={user}/>} />
        <Route path="/perfil" element={<Profile user={user} />} />
        <Route path="/recuperacion" element={<Recuperacion/>} />
        <Route path="/amigos" element={<Amigos  user={user}/>} />
        <Route path="/user_profile" element={<User_profile user={user}/>} />
      </Routes>
    </Router>
  );
}

export default App;
