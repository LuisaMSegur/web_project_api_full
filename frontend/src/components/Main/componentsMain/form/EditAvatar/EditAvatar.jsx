import React, { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar({ handleUpdateAvatar, loading }){
    const { currentUser } = useContext(CurrentUserContext);
    const [avatar, setAvatar] = useState("");
    
    useEffect(() => {
        if (currentUser) {
          setAvatar(currentUser.avatar); 
        }
      }, [currentUser]);
    
      const handleAvatarChange = (event) => {
        setAvatar(event.target.value); 
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if (!avatar) {
          return;
        }
        handleUpdateAvatar({avatar}); 
      };
    return(
        <form className="form" id="form-avatar" onSubmit={handleSubmit}>
                <input type="url" name="avatar" placeholder="Enlace de la imagen" className="form__input" id="input-image"
                     onChange={handleAvatarChange} required/>
                <span className="form__input-error" id="input-image-error"></span>
                <button className="form__submit" type="submit">Guardar</button>
                {loading && <p className="form__loading">Cargando...</p>} 
            </form>
    )
}