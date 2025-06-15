# GymWeb-TFG

Web para la administración de un gimnasio

GymWeb-TFG es una solución integral diseñada para gestionar el negocio de un gimnasio. El sistema permite monitorizar y gestionar eficientemente las operaciones de alta/baja de usuarios (trabajadores o clientes), programar clases, gestionar inventario, cuotas/membresías, salarios de trabajadores, entre otras funcionalidades.

---

## Características Principales

- Gestión de usuarios (altas, bajas, edición)
- Gestión de clases y calendario semanal
- Gestión de inventario de productos
- Gestión de clientes y suscripciones
- Gestión de empleados y salarios
- Fichaje de empleados y clientes (entrada/salida)
- Carrusel de entrenadores y clases destacadas
- Interfaz responsiva y moderna
- Sistema de temas claro/oscuro
- Compatibilidad multiplataforma (Web/Móvil)
- Integración con IA para chat y asistencia
- Seguridad con autenticación y roles

---

## Tecnologías Utilizadas

- **Frontend:** Vue 3 (JavaScript)
- **Backend:** Node.js/Express (JavaScript)
- **Base de Datos:** Supabase (PostgreSQL)
- **Framework UI:** Bootstrap 5, TailwindCSS, GSAP
- **Otras:** Pinia, Vue Router, vConfetti, Cookies, Shepherd/driver.js

---

## Guía de Instalación

### Dependencias Requeridas

```bash
npm install
npm install -D sass
npm install bootstrap
```

### Configuración del Entorno

1. Editor recomendado: Visual Studio Code
2. Extensiones sugeridas:
   - Live Server
   - Bootstrap IntelliSense
   - SCSS IntelliSense
   - Prettier

### Comandos Útiles

```bash
# Iniciar modo desarrollo
npm run dev

# Construir versión de producción
npm run build

# Ejecutar pruebas
npm test
```

---

## Estructura del Proyecto

```plaintext
GymWeb-TFG/
│   .editorconfig
│   .gitattributes
│   .gitignore
│   .prettierrc.json
│   eslint.config.js
│   index.html
│   jsconfig.json
│   package.json
│   README.md
│   vite.config.js
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── assets/
│   │   ├── ComponentStyles/
│   │   ├── img/
│   │   ├── stores/
│   │   └── ViewStyles/
│   ├── components/
│   │   ├── Authenticator.vue
│   │   ├── CalendarioClases.vue
│   │   ├── EntrenadoresCarrusel.vue
│   │   ├── Fichaje.vue
│   │   ├── IA.vue
│   │   ├── Inventario.vue
│   │   ├── ListaClases.vue
│   │   ├── ListadoClientes.vue
│   │   ├── ListadoEmpleados.vue
│   │   └── ...
│   ├── games/
│   ├── router/
│   ├── server/
│   │   └── index.js
│   └── views/
│       ├── HomeView.vue
│       ├── PerfilView.vue
│       ├── PersonalView.vue
│       ├── ClientesView.vue
│       └── ...
└── .vscode/
    └── extensions.json
```

---

## Guía de Estilos

El sistema implementa un diseño moderno y responsivo utilizando Bootstrap 5 y TailwindCSS como base, con personalizaciones propias en los archivos de estilos ubicados en `src/assets/ComponentStyles/` y `src/assets/ViewStyles/`.

---

## Imágenes del Sistema

| Imagen | Descripción |
|--------|-------------|
| ![Login](docs/login.png) | Pantalla de inicio de sesión |
| ![Dashboard](docs/dashboard.png) | Panel principal con acceso a módulos |
| ![Calendario](docs/calendario.png) | Vista de calendario de clases |
| ... | ... |

---

## Consideraciones Técnicas

- **Diseño Responsivo:** Adaptable a diferentes dispositivos y tamaños de pantalla
- **Compatibilidad:** Probado en Google Chrome, Mozilla Firefox y Microsoft Edge
- **Rendimiento:** Optimizado para carga rápida y respuesta fluida

---

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

---

## Licencia

Este proyecto está bajo licencia nuestra porque lo hemos hecho con mucho cariño y amor :D 