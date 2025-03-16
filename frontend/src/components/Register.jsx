import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.jsx";

export default function Register({handleRegister}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await handleRegister(email, password);
      setIsSuccess(true);
      setTooltipMessage("Registro exitoso");
      setIsTooltipOpen(true);

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      setIsSuccess(false);
      setTooltipMessage("Uy, algo salió mal. Inténtalo de nuevo.");
      setIsTooltipOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  }
  


  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Regístrate</h2>
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
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login__input"
          minLength={6}
          maxLength={15}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <button className="login__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Regístrate"}
        </button>
        <p className="login__register">
          ¿Ya eres miembro?&nbsp;
          <Link className="login__register-link" to="/signin">
            Inicia sesión aquí
          </Link>
        </p>
      </form>
      <InfoTooltip
      isOpen={isTooltipOpen}
              isSuccess={isSuccess}
              onClose={() => setIsTooltipOpen(false)}
              message={tooltipMessage}
            />
    </div>
  );
}
