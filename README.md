# Tripleten web_project_api_full

Aplicación para compartir tarjetas con fotos de lugares alrededor del mundo. Los usuarios pueden crear su cuenta, editar perfil, agregar o eliminar imagenes, dar like/dislike. Con un diseño simple pero moderno.

## Tecnologias utilizadas

_Frontend:_ 
1. HTML y CSS
2. JavaScript
3. React
4. Vite

_Backend:_
1. Express
2. MongoDB
3. Node.js
4. Pruebas con Potsman

_Despliegue:_
Google Cloud

## Características principales

- Registro e inicio de sesión de usuarios con autenticación JWT.
- Edición de perfil (nombre, descripción, avatar).
- Crear, eliminar y editar tarjetas con imágenes y texto.
- Dar y recibir "likes" en las tarjetas.
- Interfaz responsive adaptada a diferentes tamaños de pantalla.
- Validación de formularios y ventanas modales.
- Despliegue en un servidor remoto en Google Cloud.

![alt text](<frontend/src/images/Captura de pantalla 2025-02-12 013113.png>)

![alt text](<frontend/src/images/Captura de pantalla 2025-02-12 020402.png>)

![alt text](<frontend/src/images/Captura de pantalla 2025-02-17 123334.png>)

![alt text](<frontend/src/images/Captura de pantalla 2025-02-17 123533.png>)


## Instalación

# Frontend: 
- Clona el repositorio:
git clone 

- Ve a la carpeta del frontend:
cd nombre-repo/frontend

- Instala las dependencias:
npm install

- Ejecuta el servidor de desarrollo:
npm run dev

* La aplicación estará disponible en http://localhost:5173.

# Backend:
- Ve a la carpeta del backend:
cd nombre-repo/backend

- Instala las dependencias:
npm install

* Crea un archivo .env con las variables necesarias (como la conexión a MongoDB y las claves secretas).

- Ejecuta el servidor:
npm start

* El backend estará disponible en http://localhost:3000.