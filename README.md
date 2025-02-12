# Node.js REST API

Este proyecto es una API REST construida con Node.js y Express. La API incluye autenticación JWT, manejo de tokens de refresco, y conexión a una API externa (PokeAPI).

## Características

- **Autenticación JWT**: Login y logout con generación de tokens de autenticación y refresco.
- **Rutas protegidas**: Acceso a rutas protegidas solo con un token válido.
- **Conexión a API externa**: Obtención de datos de la PokeAPI.

## Requisitos

- Node.js v14 o superior
- npm v6 o superior

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Crea un archivo .env

4. Inicia el servidor:
    ```sh
    npm run dev
    ```

## Ejecutar test unitarios

npm test

## Ejecutar test unitarios concretos

npx jest tests/authService.test.js

## Ejecutar como servicio

En el directorio
    ```sh
    start /min cmd /c "node src/server.js"
    ```
Se ejecutará minimizada cmd

Uso de pm2 o nssm si no vale

## Uso

### Registro de usuario

- **Endpoint**: `POST /auth/register`
- **Body** (JSON):
    ```json
    {
        "username": "testuser",
        "password": "testpassword"
    }
    ```

### Login

- **Endpoint**: `POST /auth/login`
- **Body** (JSON):
    ```json
    {
        "username": "testuser",
        "password": "testpassword"
    }
    ```

### Obtener Pokémon

- **Endpoint**: `GET /pokemon`
- **Headers**:
    ```json
    {
        "Authorization": "Bearer your_auth_token"
    }
    ```

## Licencia

Este proyecto está bajo la licencia GPL 2