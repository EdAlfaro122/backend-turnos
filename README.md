# Backend Turnos

API REST desarrollada con Node.js, Express y FileSystem para gestionar servicios y reservas.

## Tecnologías

- Node.js
- Express
- JavaScript (ESM)
- FileSystem (`fs/promises`)
- dotenv
- Persistencia en archivos JSON

## Instalación

Clonar el repositorio y entrar en la carpeta del proyecto:

```bash
cd backend-turnos
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` basado en `.env.example`:

```env
PORT=8080
NODE_ENV=development
```

## Ejecución

Modo desarrollo:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:8080
```

## Servicios

### Obtener todos los servicios

```http
GET /api/services
```

### Obtener un servicio por ID

```http
GET /api/services/:sid
```

### Crear un servicio

```http
POST /api/services
```

### Actualizar un servicio

```http
PUT /api/services/:sid
```

### Eliminar un servicio

```http
DELETE /api/services/:sid
```

Los servicios se almacenan en:

```text
src/data/services.json
```

## Reservas

### Crear una reserva

```http
POST /api/bookings
```

### Obtener una reserva por ID

```http
GET /api/bookings/:bid
```

### Agregar un servicio a una reserva

```http
POST /api/bookings/:bid/services/:sid
```

Si se agrega nuevamente el mismo servicio, su cantidad (`quantity`) aumenta.

Las reservas se almacenan en:

```text
src/data/bookings.json
```

## Persistencia

La información se guarda utilizando `fs/promises` en archivos JSON, por lo que los datos permanecen almacenados incluso después de reiniciar el servidor.
