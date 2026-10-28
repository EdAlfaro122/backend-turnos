# Backend Turnos

API REST desarrollada con Node.js y Express para gestionar servicios y reservas. La persistencia se realiza mediante archivos JSON utilizando `fs/promises`.

## Tecnologías

- Node.js
- Express
- JavaScript con módulos ES (ESM)
- dotenv
- File System (`fs/promises`)
- Persistencia en archivos JSON

## Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone URL_DEL_REPOSITORIO
cd backend-turnos
npm install
```

Crea un archivo `.env` tomando como referencia `.env.example`:

```env
PORT=8080
NODE_ENV=development
```

## Ejecución

Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

La API estará disponible en:

`http://localhost:8080`

## Arquitectura del proyecto

La API está organizada en capas para separar responsabilidades y facilitar el mantenimiento:

### Responsabilidades de cada capa

- **Routes:** definen los endpoints y los conectan con los controladores.
- **Controllers:** reciben las solicitudes HTTP, extraen los datos necesarios y envían las respuestas.
- **Services:** contienen las reglas de negocio y las validaciones de servicios y reservas.
- **Repositories:** ofrecen una interfaz de acceso a los datos y delegan las operaciones al DAO.
- **DAO (Data Access Object):** realiza la lectura y escritura de los archivos JSON.
- **Data:** contiene los archivos JSON utilizados para la persistencia.
- **Config:** centraliza la configuración de las variables de entorno.

El flujo de una solicitud es:

`Router → Controller → Service → Repository → DAO → JSON`

Esta separación permite cambiar la tecnología de persistencia en el futuro sin tener que concentrar esa lógica en los controladores.

## Endpoints de servicios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/services` | Obtener todos los servicios |
| GET | `/api/services/:sid` | Obtener un servicio por ID |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |

Los servicios se almacenan en `src/data/services.json`.

### Filtros de servicios

Se puede filtrar por categoría y disponibilidad mediante parámetros de consulta:

```http
GET /api/services?category=Entrenamiento
GET /api/services?available=true
GET /api/services?category=Entrenamiento&available=true
```

### Ejemplo para crear un servicio

Enviar un cuerpo JSON con los campos requeridos:

```json
{
  "name": "Entrenamiento Personal",
  "description": "Sesión individual de entrenamiento.",
  "duration": 60,
  "price": 30,
  "category": "Entrenamiento",
  "available": true
}
```

## Endpoints de reservas

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/bookings` | Crear una reserva |
| GET | `/api/bookings/:bid` | Obtener una reserva por ID |
| POST | `/api/bookings/:bid/services/:sid` | Agregar un servicio a una reserva |

Las reservas se almacenan en `src/data/bookings.json`.

Cuando se agrega a una reserva un servicio que ya existe en ella, se incrementa su campo `quantity` en lugar de crear una entrada duplicada.

## Persistencia

La información se guarda utilizando `fs/promises` en archivos JSON, por lo que los datos permanecen almacenados incluso después de reiniciar el servidor.

## Arquitectura del proyecto

El proyecto está organizado en las siguientes capas:

- **Routes:** definen los endpoints y los conectan con sus respectivos controladores.
- **Controllers:** reciben las solicitudes HTTP, llaman a los managers y envían las respuestas.
- **Managers:** contienen la lógica de gestión de servicios y reservas, incluyendo la lectura y escritura de los archivos JSON.
- **Data:** almacena los datos de servicios y reservas en archivos JSON.
- **Config:** gestiona la configuración del entorno mediante variables de entorno.

### Filtros de servicios

Es posible filtrar los servicios mediante parámetros de consulta:

```http
GET /api/services?category=Entrenamiento
GET /api/services?available=true
GET /api/services?category=Entrenamiento&available=true
```
=======
Los datos se leen y escriben mediante `fs/promises` en archivos JSON. La información permanece guardada después de reiniciar el servidor.

## Variables de entorno

El archivo `.env.example` contiene las variables de ejemplo necesarias para configurar el entorno. El archivo `.env` real no debe subirse al repositorio.

## Seguridad y control de versiones

- No subir `.env` ni credenciales privadas.
- No incluir `node_modules` en el repositorio.
- Instalar las dependencias mediante `npm install`.
