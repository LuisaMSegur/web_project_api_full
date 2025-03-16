import React, { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }){
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    onAddPlaceSubmit({ name, link })
      .then(() => {
        setName("");
        setLink("");
      })
      .catch((err) => console.error("Error en el formulario:", err))
      .finally(() => setIsSubmitting(false));
  };
 
    return(
        <form className="form" id="form-card" onSubmit={handleSubmit}>
                <input type="text" name="title" 
                minLength="2" maxLength="40" 
                placeholder="Titulo" className="form__input"
                    id="input-place" 
                    value={name}
        onChange={(e) => setName(e.target.value)} required/>
                <span className="form__input-error" id="input-place-error"></span>

                <input type="url" name="link" 
                placeholder="Enlace a la imagen" 
                className="form__input" id="input-image"
                value={link}
        onChange={(e) => setLink(e.target.value)}
                    required />
                <span className="form__input-error" id="input-image-error"></span>

                <button className="form__submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Creando..." : "Crear"}</button>
                {isSubmitting && <p className="form__loading">Cargando...</p>}
            </form>
    )
}