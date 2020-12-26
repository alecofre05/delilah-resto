# Delilah Resto: 

Tercer trabajo del curso de Desarrollo Web Full Stack de Acámica.

## Tecnologías utilizadas:

- Node js
- Express 
- MySQL 
- Postman
- Sequelize 
- Swagger 
- JWT

## Instalación e inicialización del proyecto: 

#### 1) Clonar el proyecto: 

Clonar el repositorio desde el [siguiente link](https://github.com/alecofre05/delilah-resto)

Desde consola ejecutar el comando:

`git clone https://github.com/alecofre05/delilah-resto`

#### 2) Instalar las dependencias: 

- npm install 
- npm i -g nodemon<br>  
- npm i --save express<br>
- npm i --save body-parser<br>  
- npm i --save jsonwebtoken<br> 
- npm -i --save dotenv<br>
- npm -i --save sequelize<br>  
- npm -i — save mysql2<br> 
- npm -i --save bcrypt<br>  
- npm - i --save jsonwebtoken<br>

#### 3) Acceder a la base de datos:

- Abrir XAMPP e iniciar los servicios de Apache y MYSQL<br>
- Para abrir MYSQL: [Database](https://remotemysql.com/databases.php) y luego acceder a phpmyadmin<br>
- Ver información de acceso a la DB en el archivo .env<br>

#### 4) Iniciar proyecto: 

- Es necesario poner 'force: true' al menos una vez en el archivo 'app.js'.
- Utilizar 'force: true' sólo la primera vez que se corre la aplicación, y luego pasarlo a 'false', ya que, en caso contrario, las tablas se van a borrar y volver a crear.
- Iniicar la aplicación con el comando: 

`nodemon app`

## 5) Documentación de la API:

- Abrir el archivo openapi.js e importarlo en [Swagger](https://editor.swagger.io/)<br>
- IMPORTANTE: Para crear un usuario ADMIN, es necesario agregar la propiedad 'isAdmin: true', ya que por defecto si no agregamos esta propiedad el usuario no tiene permisos de edición.<br>

## 6) Preparado para utilizar! 

- Testear los endpoints provistos desde postman para poder hacer uso de la API y base de datos generadas
