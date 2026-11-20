# Backend Turnos

API REST para la gestión de servicios y reservas, desarrollada con Node.js, Express y MongoDB Atlas mediante Mongoose.

## Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv

## Arquitectura

El proyecto utiliza una arquitectura en capas:

- **Routes:** definición de endpoints.
- **Controllers:** gestión de peticiones y respuestas HTTP.
- **Services:** lógica de negocio.
- **Repositories:** abstracción del acceso a datos.
- **DAO:** operaciones de persistencia mediante Mongoose.
- **Models:** esquemas de MongoDB.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/EdAlfaro122/backend-turnos
cd backend-turnos
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=TU_URI_DE_MONGODB_ATLAS
```

Reemplazar el valor de `MONGO_URI` por la URI de conexión propia de MongoDB Atlas.

## Ejecución

Iniciar el servidor en desarrollo:

```bash
npm run dev
```

El servidor estará disponible en:

`http://localhost:8080`

## Migración inicial

Los archivos JSON ubicados en `src/data/` contienen los datos originales utilizados para la migración.

Para ejecutar la migración inicial:

```bash
node src/seed.js
```

**Importante:** el script comprueba que las colecciones estén vacías para evitar duplicar registros. Debe ejecutarse únicamente cuando corresponda realizar la migración inicial.

## Endpoints

### Servicios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/services` | Obtener todos los servicios |
| GET | `/api/services/:sid` | Obtener un servicio por ID |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |

### Reservas

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/bookings` | Crear una reserva |
| GET | `/api/bookings/:bid` | Obtener una reserva por ID |
| POST | `/api/bookings/:bid/services/:sid` | Agregar un servicio a una reserva |

## Modelos

El proyecto cuenta con tres modelos de Mongoose:

- **Service:** información de los servicios disponibles.
- **Booking:** información de las reservas y referencias a servicios mediante ObjectId.
- **Message:** estructura para mensajes.

## Seguridad

Las credenciales de conexión se almacenan en `.env`, archivo excluido del repositorio mediante `.gitignore`.

El repositorio incluye `.env.example` como referencia para configurar las variables de entorno.

## Vistas y actualización en tiempo real

- `/views/services` muestra los servicios guardados en MongoDB.
- `/views/bookings` muestra la fecha, hora y estado de las reservas.
- Al crear, actualizar o eliminar un servicio mediante la API, Socket.io actualiza el listado en los navegadores conectados.

Para comprobarlo, abre `http://localhost:8080/views/services` en dos pestañas y crea un servicio en tu base de pruebas:

```bash
curl -X POST http://localhost:8080/api/services -H 'Content-Type: application/json' -d '{"name":"Consulta de prueba","description":"Servicio para verificar la vista","duration":30,"price":25,"category":"Consultas","available":true}'
```

La API responde con HTTP 201 y el servicio aparece en ambas pestañas sin recargar.
Puedes eliminar el registro con `DELETE /api/services/:sid` usando el ID de la respuesta.
