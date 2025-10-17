
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

## 🐳 Despliegue con Docker Compose

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

Podés desplegar el contenedor generado por Docker en [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/) o [Azure App Service (Linux)](https://learn.microsoft.com/en-us/azure/app-service/overview). Esto permite servir la aplicación Angular en la nube con escalabilidad automática y conexión directa al backend.

### 🚀 Pasos generales

1. **Build de la imagen Docker**:
   ```bash
   docker build -t micros-frontend .
   ```

2. **Push a Azure Container Registry (ACR)**:
   ```bash
   az acr build --registry <tu-registro> --image micros-frontend .
   ```

3. **Desplegar en Azure Container Apps**:
   ```bash
   az containerapp create \
     --name micros-frontend \
     --resource-group <tu-grupo> \
     --image <tu-registro>.azurecr.io/micros-frontend \
     --target-port 80 \
     --ingress external
   ```

### 🔧 Configuración necesaria

- Asegurate de configurar las **variables de entorno** para apuntar al backend correcto (`environment.prod.ts`).
- El backend debe estar accesible desde la app Angular (puede estar desplegado en Azure, en un VPS o en una instancia Docker pública).
- Si el backend usa HTTPS o autenticación, asegurate de configurar los headers y CORS correctamente.

---

## 🔗 Integración con el backend

La aplicación Angular se comunica con la API .NET Core mediante peticiones HTTP. Para que funcione correctamente, es necesario que el backend esté levantado y accesible desde el entorno donde corre el frontend.

### 📁 Configuración en `environment.ts`

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api' // o la URL pública del backend
};
```

### 🔄 Endpoints consumidos

La app interactúa con los siguientes módulos del backend:

- `/api/Chico`: gestión de chicos
- `/api/Chofer`: gestión de choferes
- `/api/Micro`: gestión de micros y asignaciones

### 🧪 Recomendaciones

- Verificá que el backend esté corriendo antes de iniciar el frontend.
- Usá herramientas como Postman o Insomnia para testear los endpoints directamente.
- En producción, asegurate de que el dominio del frontend esté autorizado en los CORS del backend.

> 💡 Para más detalles sobre cómo levantar el backend, consultá su documentación [aquí](https://github.com/urtubeycarlos/ChallengeCompraGamer_Backend).


---

## 🧭 Guía técnica y convenciones


### 📦 Versionado y changelog

Esta sección documenta cómo se gestionan las versiones del proyecto.

#### 🪛 Convenciones de ramas

Para mantener una estructura clara en el desarrollo, se siguen estas convenciones de nombres de ramas:

- `feature/nombre-feature`: para nuevas funcionalidades
- `fix/nombre-fix`: para correcciones de bugs
- `refactor/nombre-refactor`: para mejoras internas sin cambio funcional

Todas estas ramas se crean desde `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/asignar-chicos-a-micro
```

Una vez finalizado el desarrollo, se hace un Pull Request hacia `develop`.

---

#### 🔥 Hotfixes en producción

Cuando se necesita aplicar una corrección urgente sobre `main` (ya desplegado en producción), se sigue este flujo:

1. Crear una rama desde `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/fix-patente-duplicada
   ```

2. Aplicar el fix y testear.

3. Hacer PR hacia `main` y mergear.

4. Taggear una nueva versión:
   ```bash
   git tag release-1.0.1
   git push origin release-1.0.1
   ```

5. Mergear también hacia `develop` para mantener consistencia:
   ```bash
   git checkout develop
   git pull origin develop
   git merge hotfix/fix-patente-duplicada
   git push origin develop
   ```

> 💡 Esto evita que los fixes se pierdan en futuras versiones y mantiene `main` como fuente confiable de releases.


#### 🏷️ Convenciones de versionado

- Se utiliza **versionado semántico**: `MAJOR.MINOR.PATCH`
  - `MAJOR`: cambios incompatibles o reestructuración significativa
  - `MINOR`: nuevas funcionalidades compatibles
  - `PATCH`: correcciones menores o ajustes internos

#### 🧩 Etiquetado de releases

- Los tags se crean desde `develop` una vez estabilizada la funcionalidad:
  ```bash
  git tag release-1.0.0
  git push origin release-1.0.0
  ```
- Se crea una rama temporal desde el tag para hacer el PR hacia `main`:
  ```bash
  git checkout -b release/1.0.0 release-1.0.0
  git push origin release/1.0.0
  ```

---


## 📝 TODO

- [ ] **Handling de errores en tiempo de ejecución**  
  Implementar una estrategia global para detectar caídas del servidor mientras el usuario navega por la aplicación. Esto puede incluir interceptores HTTP, feedback visual y redirección automática a `/error`.

- [ ] **Página de error**  
  Crear una vista dedicada para errores del servidor y/o rutas no encontradas. Debe incluir un mensaje claro, diseño consistente con la app, y un botón para volver al inicio o al dashboard principal.

- [ ] **Integración con SignalR**  
  Incorporar comunicación en tiempo real mediante [SignalR](https://learn.microsoft.com/es-es/aspnet/signalr/overview/getting-started/introduction-to-signalr) para recibir actualizaciones del backend (por ejemplo, cambios de estado en micros, notificaciones o eventos en vivo). Definir un servicio Angular para manejar la conexión, reconexión y suscripción a canales relevantes.  

  - [ ] **Definir protocolo para cambios de firma en endpoints**  
  Establecer un procedimiento formal para cuando se modifique la estructura de entrada (`RequestDTO`) o salida (`ResponseDTO`) de un endpoint.
