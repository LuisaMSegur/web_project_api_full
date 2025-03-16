import React, { useState, useContext, useEffect } from 'react'; 
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';

export default function EditProfile(){
    const userContext = useContext(CurrentUserContext); 
    const { currentUser, handleUpdateUser } = userContext;
    const [name, setName] = useState('');
    const [about, setDescription] = useState('');
  
    useEffect(() => {
      if (currentUser) {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }
    }, [currentUser]);
  
  const handleNameChange = (event) => {
    setName(event.target.value); 
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); 
  };
  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (!name || !about) {
      return;
    }
    handleUpdateUser({ name, about });  
  };
    return(
        <form className="form" id="form-profile" 
        name="profile-form" noValidate
        onSubmit={handleSubmit} >
                <input type="text" name="name" 
                minLength="2" maxLength="40" 
                className="form__input" id="name" required 
                value={name} onChange={handleNameChange} />
                <span className="form__input-error" id="name-error"></span>
                <input type="text" name="about" 
                minLength="2" maxLength="200" 
                className="form__input" id="aboutme" required 
                value={about} onChange={handleDescriptionChange} />
                <span className="form__input-error" id="aboutme-error"></span>
                <button className="form__submit" type="submit">Guardar</button>
            </form>
    )
}