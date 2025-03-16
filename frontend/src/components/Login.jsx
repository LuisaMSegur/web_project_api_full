import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.jsx";

export default function Login({ handleLogin, setUserEmail }) {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isTooltipOpen, setIsTooltipOpen] = useState(false);
 const [tooltipMessage, setTooltipMessage] = useState("");
 const navigate = useNavigate();

 async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const token = await auth.authorize(email, password);
    if(token) {
      localStorage.setItem("email", email); 
        handleLogin(email, password);
        setUserEmail(email);
      navigate("/");
      setIsTooltipOpen(true);
      setTooltipMessage("success");
    } else {
      setIsTooltipOpen(true);
      setTooltipMessage("Uy, algo salió mal. Inténtalo de nuevo.");
}
    setIsSubmitting(false); 
  }
  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Inicia sesión</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          className="login__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required
          disabled={isSubmitting}
        />
        <span>{isTooltipOpen} </span>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <span>{isTooltipOpen} </span>
        <button className="login__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Iniciando..." : "Inicia sesión"}
        </button>
        <p className="login__register">
          ¿Aún no eres miembro?&nbsp;
          <Link className="login__register-link" to="/signup">
            Regístrate aquí
          </Link>
        </p>
      </form>
      <InfoTooltip
        isOpen={isTooltipOpen}
        isSuccess={tooltipMessage === "success"}
        onClose={() => setIsTooltipOpen(false)}
        message={tooltipMessage}
      />
    </div>
  );
}

