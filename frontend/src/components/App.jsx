import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import * as auth from "../utils/auth.js";
import Header from "./Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import api from "../utils/Api.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState({ isOpen: false, title: "", content: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }

    auth.checkToken(token)
      .then((userData) => {
        setIsLoggedIn(true);
        setEmail(userData.email);
        setCurrentUser(userData);
        localStorage.setItem("email", userData.email);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error verificando el token:", error);
        handleLogout(); 
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [token]); 

  useEffect(() => {
    if (isLoggedIn) {
      api.getUser()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => console.error("Error obteniendo usuario:", error));
    }
  }
  , [isLoggedIn]);
  
  useEffect(() => {
    if (isLoggedIn) {
      api.getCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((error) => console.error("Error obteniendo tarjetas:", error));
    }
  }, [isLoggedIn]);
  
//Funciones para iniciar y cerrar sesión
  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((token) => {
        if (!token) throw new Error("No se recibió un token");
        setToken(token);
        return api.getUser ();
      })
      .then((user) => {
        setCurrentUser (user);
        setIsLoading(false);
        setIsLoggedIn(true);
        localStorage.setItem("email", email);
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setEmail("");
    navigate("/signin");
    setToken(null);
  }

  async function handleRegister(email, password) {
    try {
      await auth.register(email, password);
    } catch (err) {
      console.error("Error en el registro:", err);
    }
  }

  //funciones para editar perfil, avatar y agregar cartas
  const handleUpdateUser = ({name, about}) => {
    api.editUser({name, about})
      .then((res) => {
      if (res && res.name && res.about){
        setCurrentUser(res);
        setPopup({isOpen:false});
      }
      })
      .catch((error) =>
        console.error("Error al actualizar el usuario:", error)
      );
  };
  
const handleUpdateAvatar = ({avatar}) => {
  api.editAvatar({avatar})
    .then((user) => {
      setCurrentUser(user);
      setPopup({isOpen:false});
    })
    .catch((error) =>
      console.error("Error al actualizar el avatar:", error)
    );
};

const onAddPlaceSubmit = (newCard) => {
  return api.createCard(newCard)
    .then((card) => {
      setCards((prevCards) => [card, ...prevCards])
      setPopup({isOpen:false});
    })
    .catch((err) => console.error("Error al agregar la tarjeta:", err));
};

//funciones de los popups y los likes
function handleOpenPopup(title, content) {
  setPopup({ isOpen: true, title, content });
}

function handleClosePopup() {
  setPopup({ isOpen: false, title: "", content: null });
}

const handleCardDelete = (card) => {
  api.deleteCard(card._id)
    .then(() => {
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
    })
    .catch((error) =>
      console.error("Error al eliminar la tarjeta:", error)
    );
};

return (
  <div className="page">
  <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
      <Header handleLogout={handleLogout} email={email}/>
      <Routes>
        <Route path="/signin" element={isLoggedIn ? <Navigate to="/" /> : <Login handleLogin={handleLogin} setUserEmail={setEmail}/>} />
        <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
        <Route
  path="/"
  element={
      <ProtectedRoute isLoggedIn={isLoggedIn} >
        <Main
          cards={cards}
          handleCardDelete={handleCardDelete}
          onAddPlaceSubmit={onAddPlaceSubmit}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          handleUpdateAvatar={handleUpdateAvatar}
          popup={popup}
        /> 
      </ProtectedRoute>
  }
/>
   <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/signin"} />} />
      </Routes>
      <Footer />
  </CurrentUserContext.Provider>
    </div>
);
}
 


export default App;
