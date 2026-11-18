# biblioteca-app

Web de la biblioteca del instituto hecha con Node.js, Express y EJS (Práctica U2.5).

## Cómo ejecutarla

```bash
npm install
npm run dev     # o: npm start
```

Después abre http://localhost:3000

## Rutas

| Ruta | Qué muestra |
|------|-------------|
| `/` | Página de inicio |
| `/horario` | Horario de apertura (tabla generada desde un array) |
| `/libros` | Catálogo completo con el total de libros |
| `/libros/disponibles` | Solo los libros disponibles |
| cualquier otra | Página 404 (código de estado 404) |

## Estructura

```
biblioteca-app/
├── app.js
├── package.json
├── public/css/estilos.css
└── views/
    ├── index.ejs
    ├── horario.ejs
    ├── libros.ejs
    ├── 404.ejs
    └── partials/
        ├── cabecera.ejs
        └── pie.ejs
```
