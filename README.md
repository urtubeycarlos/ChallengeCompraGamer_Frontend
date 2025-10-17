
# 🚌 Gestión de Micros

Aplicación web para administrar micros, choferes y pasajeros. Incluye validaciones y despliegue automatizado con Docker Compose.

---

## 🚀 Tecnologías utilizadas

- **Angular 20**
- **TypeScript**
- **SCSS**
- **Angular Material**
- **Docker + Docker Compose**
- **NGINX** como servidor estático
- **Azure Container Apps** (opcional para despliegue cloud)

---

## 📦 Requisitos previos

Antes de comenzar, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) (v22+ recomendado)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [Docker Desktop](https://docs.docker.com/desktop)

---

## 🛠️ Instalación local

1. **Clonar el repositorio**

```bash
git clone https://github.com/urtubeycarlos/ChallengeCompraGamer_Frontend.git
cd ChallengeCompraGamer_Frontend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Ejecutar en modo desarrollo**

```bash
npm run start
```

La app estará disponible en `http://localhost:4200`. 

Tenga en cuenta que deberá levantar el backend en modo desarrollo para el correcto funcionamiento del frontend a la hora de cargar datos, el mismo se encuentra [aquí](https://github.com/urtubeycarlos/ChallengeCompraGamer_Backend) con su correspondiente documentación.

---

## 🧪 Comandos útiles

- **Build de producción**

```bash
npm run build
```

- **Tests (si están configurados)**

```bash
npm run test
```

---

## 🐳 Despliegue con Docker Compose```

 **Ejecutar Docker Compose**

```bash
docker-compose up --build
```

Esto levantará:

- Un contenedor con NGINX sirviendo la app Angular
- (Opcional) Otros servicios que desee agregar en `docker-compose.yml`

La app estará disponible en `http://localhost:80`.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── feature/                  → Módulos funcionales independientes
│   │   ├── chicos/               → Módulo para gestión de chicos (Por ej.)
│   │   │   ├── components/       → Componentes específicos del módulo (ej. tabla de chicos, formulario)
│   │   │   ├── models/           → Interfaces y tipos propios del módulo (ej. Chico, Tutor, etc.)
│   │   │   ├── pages/            → Páginas routeables (dashboard, detalles, etc.)
│   │   │   ├── services/         → Servicios para lógica y comunicación con API (ej. ChicosService)
│   │   │   └── chicos.routes.ts  → Enrutado del módulo (lazy loading, guards, rutas internas)
│   │   └── ...                   → Otros módulos como micros, choferes, etc.
│   └── app.config.ts     → Configuración global de providers
│   ├── app.routes.ts     → Definición de rutas principales del proyecto (lazy loading, guards, redirecciones)
│   ├── app.scss          → Para estilos específicos de la app (override de Material, layout base)
├── environments/
│   ├── environment.ts        → Configuración para entorno de desarrollo
│   └── environment.prod.ts   → Configuración para entorno de producción
├── index.html            → HTML base de la aplicación
├── main.ts               → Punto de entrada principal
├── styles.scss           → Estilos globales
├── Dockerfile            → Build y despliegue de la app con NGINX
├── docker-compose.yml    → Orquestación de servicios de Docker
├── ...					  → Otros archivos de configuraciones generales (ej. linting de angular, configuración de TypeScript, gitignore, etc.)
public/
└── assets/
    ├── animations/       → Archivos `.json` de Lottie (ej. bus-loading.json)
└── ...                   → Otras carpetas autogeneradas (node_modules, configuración local de tu IDE, frontend compilado, etc.)
```

---

## 🧩 Funcionalidades destacadas

- Validación de formularios reactivos
- Tabla con filtros, paginación y acciones condicionales
- Despliegue reproducible con Docker

---

## 📦 Despliegue en Azure (opcional)

Podés usar [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/) para desplegar el contenedor generado por Docker. Asegurate de configurar las variables de entorno y el backend correctamente.

---

## 📞 Soporte

Para dudas o mejoras, contactá al autor o abrí un issue en el repositorio.


## 📝 TODO

- [ ] **Handling de errores en tiempo de ejecución**  
  Implementar una estrategia global para detectar caídas del servidor mientras el usuario navega por la aplicación. Esto puede incluir interceptores HTTP, feedback visual y redirección automática a `/error`.

- [ ] **Página de error**  
  Crear una vista dedicada para errores del servidor y/o rutas no encontradas. Debe incluir un mensaje claro, diseño consistente con la app, y un botón para volver al inicio o al dashboard principal.

- [ ] **Integración con SignalR**  
  Incorporar comunicación en tiempo real mediante [SignalR](https://learn.microsoft.com/es-es/aspnet/signalr/overview/getting-started/introduction-to-signalr) para recibir actualizaciones del backend (por ejemplo, cambios de estado en micros, notificaciones o eventos en vivo). Definir un servicio Angular para manejar la conexión, reconexión y suscripción a canales relevantes.  
