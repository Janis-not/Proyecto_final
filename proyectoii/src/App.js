import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recuperacion from "./Componentes/Recuperacion";
import User_profile from "./Componentes/User_profile"
import Registrer from "./Componentes/Registrer";
import Profile from "./Componentes/Profile";
import Amigos from "./Componentes/Amigos";
import React, { useState } from "react";
import Login from "./Componentes/Login";
import Navi from "./Componentes/Navi";
import Home from "./Componentes/Home";

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
